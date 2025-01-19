const jsYaml = require("js-yaml");
const fs = require("fs");

const config = jsYaml.load(fs.readFileSync("./config.yaml", "utf-8"));

module.exports = {
  config,
};
