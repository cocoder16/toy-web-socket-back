function printPingLog(eventType, data) {
  console.log(`${eventType} is received with data: ${JSON.stringify(data)}`);
}

function printPongLog(eventType, data) {
  console.log(`${eventType} is emitted with data: ${JSON.stringify(data)}`);
}

module.exports = { printPingLog, printPongLog };
