const colors = require("colors/safe");

module.exports = function printSocketEventFired(event, data) {
  console.log(
    `The socket event fired: ${colors.red(event)} at ${colors.yellow(
      new Date().toLocaleString()
    )}`
  );
  Object.keys(data).forEach(item => {
    console.log(`${item}: `, data[item]);
  });
};
