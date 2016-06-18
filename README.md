# Setup
Scripts and instructions to setup the NodeJam project.

## Edit .bashrc or .profile
```
export NODEJAM_GIT_REPOS_PATH="/home/jeswin/repos"
export PATH=$PATH:~/apps/flow/bin:~/repos/nodejam-scripts:~/repos/nodejam-scripts/dist/
```

# Install these
```
# install webpack
npm install -g webpack
npm install -g mocha
npm install -g babel-cli

# Download and install flow from www.flowtype.org
# Place this in ~/apps/flow/ or whatever is set in .bashrc PATH above
wget https://facebook.github.io/flow/downloads/flow-linux64-latest.zip
```

## Do this "optimization"
There are plenty of large npm modules that are needed by every fora project.
To avoid downloading them for each project, do the following:

- Copy npm-common.package.json to ~/temp/npm-common
- cd ~/temp/npm-common
- npm install
