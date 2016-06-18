import childProcess from "child_process";
import promisify from "nodefunc-promisify";
import path from "path";
import fs from "fs";

const spawn = require('child_process').spawn;
function shspawn(command) {
   return spawn('sh', ['-c', command]);
}

const exec = function(cmd, print = true) {
  let strOut = "";
  let strErr = "";
  return new Promise((resolve, reject) => {
    const child = shspawn(cmd);
    child.stdout.pipe(process.stdout)
    // child.stdout.on('data', function (data) {
    //   if (print) {
    //     console.log(data.toString().trim());
    //   }
    //   strOut += data;
    // });
    //
    // child.stderr.on('data', function (data) {
    //   if (print) {
    //     console.log(data.toString().trim());
    //   }
    //   strErr += data;
    // });

    child.on('exit', function (code) {
      if (code !== 0) {
        reject(strErr);
      } else {
        resolve(strOut);
      }
    });
  });
};

const ifDirExists = async function(dir) {
  try {
      const stats = fs.lstatSync(dir);
      return stats.isDirectory();
  }
  catch (e) {
    return false;
  }
};


const ifFileExists = async function(file, dir = "") {
  const fileName = dir ? path.join(dir, file) : file;
  try {
    fs.accessSync(fileName, fs.F_OK);
    return true;
  }
  catch (e) {
    return false;
  }
};

const readPackage = async function(dir) {
  const packagePath = path.join(dir, "package.json");
  return (await ifFileExists(packagePath)) ?
    JSON.parse(fs.readFileSync(packagePath, "utf8")) :
    null;
};

export default {
  exec,
  ifFileExists,
  ifDirExists,
  readPackage
};
