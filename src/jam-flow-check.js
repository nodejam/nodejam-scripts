#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import utils from "./utils";
const { exec, ifFileExists } = utils;

const scriptName = "JP_FLOW_CHECK";

const log = (message) => {
  console.log((typeof message !== "undefined" ? message : "").trim());
}

taskRunner(
  scriptName,
  {},
  async ({project, options}) => {
    let _log = (msg) => { log(`${project}: ${msg}`) };

    if (options.build && (options.buildCommand || (await ifFileExists("build.sh")))) {
      _log("building")
      await exec(options.buildCommand || `./build.sh`);
    }

    if (options.flow && (await ifFileExists(".flowconfig"))) {
      _log("flow check")
      await exec(`flow check`);
    }
  }
);
