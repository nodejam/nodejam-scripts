#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import utils from "./utils";
const { exec, ifFileExists, readPackage } = utils;

const scriptName = "JP_NPM_COMPARE_VERSION";

const log = (message) => {
  console.log((typeof message !== "undefined" ? message : "").trim());
}

taskRunner(
  scriptName,
  {},
  async ({project, projectPath}) => {
    let _log = (msg) => { log(`${project}: ${msg}`) };

    const packageJSON = await readPackage(projectPath);
    if (packageJSON && packageJSON.version) {
      const npmVersion = await exec(`npm show ${project} version`, false);
      if (packageJSON.version.trim() !== npmVersion.trim()) {
        _log(`npm version is ${npmVersion.trim()}. Local version is ${packageJSON.version.trim()}`);
      } else {
        _log(`${npmVersion} matches remote.`)
      }
    }
  }
);
