#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import utils from "./utils";
const exec = utils.exec;

const scriptName = "JP_GIT_STATUS";

const log = (message) => {
  console.log((typeof message !== "undefined" ? message : "").trim());
}

taskRunner(
  scriptName,
  {},
  async ({repo, projectPath, project}) => {
    let _log = (msg) => { log(`${project}: ${msg}`) };

    const result = await exec(`git status -s`, false);
    if (result) {
      log(`${projectPath} has changes.`)
    }

    if (await exec(`git log origin/master..HEAD`, false)) {
      log(`${projectPath} needs to be pushed.`);
    }
  }
);
