/** Formats date time according to the */
export function formatDate(data, format, utc) {
  const year = (utc ? data.getUTCFullYear() : data.getFullYear()).toString();
  const monthV = utc ? data.getUTCMonth() + 1 : data.getMonth() + 1;
  const month = (monthV < 10 ? "0" : "") + monthV;
  const dateV = utc ? data.getUTCDate() : data.getDate();
  const date = (dateV < 10 ? "0" : "") + dateV;
  const hoursV = utc ? data.getUTCHours() : data.getHours();
  const hours = (hoursV < 10 ? "0" : "") + hoursV;
  const minsV = utc ? data.getUTCMinutes() : data.getMinutes();
  const mins = (minsV < 10 ? "0" : "") + minsV;
  const secsV = utc ? data.getUTCSeconds() : data.getSeconds();
  const secs = (secsV < 10 ? "0" : "") + secsV;
  const msV = utc ? data.getUTCMilliseconds() : data.getMilliseconds();
  const ms = (msV < 10 ? "00" : msV < 100 ? "0" : "") + msV;
  let val = format;
  val = val.replace("yyyy", year);
  val = val.replace("MM", month);
  val = val.replace("dd", date);
  val = val.replace("hh", hours);
  val = val.replace("mm", mins);
  val = val.replace("ss", secs);
  val = val.replace("fff", ms);
  return val;
}
