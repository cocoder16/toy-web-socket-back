const colors = require("colors/safe");

module.exports = function printResponseLog({ status, error }) {
  console.log(`Status: ${status}`);

  if (error) {
    console.log(`${colors.red("Error:")} \n`);
  }
};
