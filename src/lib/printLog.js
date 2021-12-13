const colors = require("colors/safe");

function printLog(data) {
  console.log(
    `${colors.yellow(data.type)} is fired with data: ${JSON.stringify(data)}`
  );
}

module.exports = printLog;
