const colors = require("colors/safe");

module.exports = function printRequestLog(req) {
  console.log(
    `\n Started ${colors.blue(req.method)} ${colors.brightBlue(
      `"${req.url}"`
    )} from ${colors.brightGreen(req.headers.origin)} at ${colors.yellow(
      new Date().toLocaleString()
    )}`
  );
};
