import fs from "fs";
import path from "path";
import utils from "./utils";
const { ifDirExists } = utils;
import repos from "./repos";

let curdir = process.cwd()

const func = async (scriptName, options, ifExists, ifMissing) => {
  const newLine = () => {
    if (options.newLine) {
      console.log("")
    }
  };
  try {
    const params = {};

    for (let key in repos) {
      process.chdir(curdir);
      for (let project of repos[key].projects) {
        params.repo = repos[key].repo.replace(/\/$/, "");
        if (typeof project === "string") {
          params.project = project;
          params.options = {};
        } else {
          params.project = project.name;
          params.options = project;
        }

        const projectPath = path.join(process.env.NODEJAM_GIT_REPOS_PATH, params.project);
        params.projectPath = projectPath;
        let exists = false;

        if (await ifDirExists(projectPath)) {
          params.projectPath = projectPath;
          process.chdir(projectPath);
          newLine();
          await ifExists(params);
        } else {
          process.chdir(process.env.NODEJAM_GIT_REPOS_PATH);
          if (ifMissing) {
            newLine();
            await ifMissing(params);
          } else {
            console.log(`${projectPath} does not exist. Skipping.`);
          }
        }
      }
    }
  }
  catch (e) {
    console.log(e.stack);
  }
};

export default function(scriptName, options, ifExists, ifMissing) {
  return func(scriptName, options, ifExists, ifMissing);
}
