const printResponseLog = require("./prints/printResponseLog");
const printRequestLog = require("./prints/printRequestLog");

module.exports = function processWithLogs({
  request,
  response,
  controllerFunction,
}) {
  console.time("실행시간");
  printRequestLog(request);
  const { status, data, error } = controllerFunction(request);
  printResponseLog({ status, error });
  console.timeEnd("실행시간");
  return response.status(status).send(data || error);
};
