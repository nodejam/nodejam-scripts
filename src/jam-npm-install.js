#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import utils from "./utils";
const exec = utils.exec;
const scriptName = "JP_NPM_INSTALL";

const log = (message) => {
  console.log((typeof message !== "undefined" ? message : "").trim());
}

taskRunner(
  scriptName,
  {},
  async ({project, projectPath, options}) => {
    let _log = (msg) => { log(`${project}: ${msg}`) };
    _log("npm install")
    await exec(`npm i`);
  }
);
