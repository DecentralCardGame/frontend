/* eslint-env node */
const pkgjson = require("./package.json");
const exec = require("child_process").exec;

for (const pkg in pkgjson.dependencies) {
  if (pkgjson.dependencies[pkg].startsWith("file:")) {
    exec(`cd ./node_modules/${pkg} && npm install`);
  }
}
