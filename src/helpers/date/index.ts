export function getUnixTimestamp(date?: Date) {
  const unixTimeMS = date?.getTime() || Date.now();

  return Math.floor(unixTimeMS / 1000);
}
