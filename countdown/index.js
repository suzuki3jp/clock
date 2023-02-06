const currentURLStr = window.location.href;
const currentURL = new URL(currentURLStr);
const UrlPrams = currentURL.searchParams;
const color = UrlPrams.get("color");
let date = UrlPrams.get("date");
let time = UrlPrams.get("time");

const secondsToHour = (seconds) => {
  seconds = parseInt(seconds);
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 60;
  return {
    hours,
    minutes,
    seconds,
  };
};

const reloadClock = () => {
  const $clock = document.getElementById("clock");

  const currentDate = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  const currentY = currentDate.getFullYear();
  const currentM = currentDate.getMonth() + 1;
  const currentD = currentDate.getDate();
  if (!date) date = `${currentY}-${currentM}-${currentD}`;
  if (!time) time = "0:0";

  const [targetY, targetM, targetD] = date.split("-");
  const [targetH, targetMin] = time.split(":");
  const targetDate = new Date(
    targetY,
    targetM - 1,
    targetD,
    targetH,
    targetMin
  );

  const diffSeconds = Math.floor(
    (targetDate.getTime() - currentDate.getTime()) / 1000
  );

  let { hours, minutes, seconds } = secondsToHour(diffSeconds);

  if (hours <= 0) hours = "00";
  if (minutes <= 0) minutes = "00";
  if (seconds <= 0) seconds = "00";
  const fontColor = color ?? "black";

  $clock.style.color = fontColor;
  $clock.innerHTML = `${hours}:${minutes}:${seconds}`;
};

reloadClock();
setInterval(reloadClock, 1_000);
