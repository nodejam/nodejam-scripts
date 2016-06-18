#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";
import path from "path";
import utils from "./utils";
const { ifDirExists, exec } = utils;

const scriptName = "JP_GIT_STATUS";

const log = (message) => {
  console.log((typeof message !== "undefined" ? message : "").trim());
}

taskRunner(
  scriptName,
  {},
  async ({projectPath}) => {
    log(`${projectPath} exists. Skipping.`);
  },
  async ({repo, projectPath, project}) => {
    let _log = (msg) => { log(`${project}: ${msg}`) };

    _log(`cloning ${project}...`);
    await exec(`git clone ${repo}/${project}`);

    process.chdir(projectPath)
    await exec(`mkdir -p node_modules`);

    const commonModulesPath = path.join(process.env.HOME, "temp/npm-common/node_modules");
    if (await ifDirExists(commonModulesPath)) {
      await exec(`cp -R ${commonModulesPath}/* node_modules`);
    }
    
    await exec(`npm i`);
  }
);
