function formatHourMin(date) {
  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());

  const hoursLength = hours.length;
  const minutesLength = minutes.length;

  if (hoursLength === 1) {
    hours = "0" + hours;
  }

  if (minutesLength === 1) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
}

module.exports = { formatHourMin };
