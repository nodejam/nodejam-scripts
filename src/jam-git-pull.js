#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import utils from "./utils";
const exec = utils.exec;

const scriptName = "JP_FLOW_CHECK";

const log = (message) => {
  console.log((typeof message !== "undefined" ? message : "").trim());
}

taskRunner(
  scriptName,
  {},
  async ({project, projectPath}) => {
    let _log = (msg) => { log(`${project}: ${msg}`) };
    _log("Pull from git")
    await exec(`git pull`);
  }
);
