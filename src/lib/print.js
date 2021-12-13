const colors = require("colors/safe");

function printPingLog(eventType, data) {
  console.log(
    `${colors.yellow(eventType)} is sent with data: ${JSON.stringify(data)}`
  );
}

function printPongLog(eventType, data) {
  console.log(
    `${colors.yellow(eventType)} is emitted with data: ${JSON.stringify(data)}`
  );
}

module.exports = { printPingLog, printPongLog };
