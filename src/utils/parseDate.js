function ms2Date(milliseconds) {
  if (typeof milliseconds == "string") {
    milliseconds = Number(milliseconds);
  }
  const date = new Date(milliseconds);
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = date
    .getSeconds()
    .toString()
    .padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}

module.exports = {
  ms2Date,
};
