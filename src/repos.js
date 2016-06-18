const repos = {
  nodejam: {
    repo: "https://github.com/nodejam/",
    projects: [
      { name: "nodejam", build: false },
      "nodejam-ide"
    ]
  },
  jeswin: {
    repo: "https://github.com/jeswin/",
    projects: [
      "nodefunc-generatorify",
      "nodefunc-promisify",
      "ceramic",
      "crankshaft",
      "isotropy",
      "isotropy-adapter-react",
      "isotropy-adapter-react-in-dom",
      "isotropy-adapter-react-relay",
      "isotropy-adapter-react-relay-in-dom",
      "isotropy-adapter-webapp",
      "isotropy-adapter-webapp-in-dom",
      "isotropy-backend-mongodb",
      "isotropy-backend-nedb",
      "isotropy-body",
      "isotropy-body-in-browser",
      "isotropy-busboy",
      "isotropy-busboy-in-browser",
      "isotropy-core",
      "isotropy-fetch",
      "isotropy-graphql",
      "isotropy-http-in-browser",
      "isotropy-in-browser",
      "isotropy-in-dom",
      "isotropy-interfaces",
      "isotropy-middleware-body",
      "isotropy-middleware-busboy",
      "isotropy-middleware-url",
      "isotropy-nedb",
      "isotropy-page",
      "isotropy-plugin-graphql",
      "isotropy-plugin-react",
      "isotropy-plugin-react-relay",
      "isotropy-plugin-static",
      "isotropy-plugin-webapp",
      "isotropy-router",
      "merge-tree"
    ]
  }
};

const _repos = Object.keys(repos)
  .reduce((acc, name) => {
    const repo = repos[name];
    acc[name] = {
      repo: repo.repo,
      projects: repo.projects.map(p => typeof p === "string" ?
        { name: p, build: true, flow: true, test: true } :
        Object.assign({}, { build: true, flow: true, test: true }, p))
    };
    return acc;
  }, {});

export default _repos;
