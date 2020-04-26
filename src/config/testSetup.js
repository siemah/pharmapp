require("ts-node/register");

// If you want to reference other typescript modules, do it via require:
const { setupEnvVariables } = require("./jestInit");

module.exports = async function() {
  // Call your initialization methods here.
  await setupEnvVariables();
  return null;
};