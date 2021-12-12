function printPingLog(eventType, data) {
  console.log(`${eventType} is received with data: ${data}`);
}

function printPongLog(eventType, data) {
  console.log(`${eventType} is emitted with data: ${data}`);
}

module.exports = { printPingLog, printPongLog };
