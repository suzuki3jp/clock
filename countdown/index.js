const currentURLStr = window.location.href;
const currentURL = new URL(currentURLStr);
const UrlPrams = currentURL.searchParams;
const color = UrlPrams.get("color");
const [targetY, targetM, targetD] = UrlPrams.get("date").split("-");
const [targetH, targetMin] = UrlPrams.get("time").split(":");

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
  const targetDate = new Date(
    targetY,
    targetM - 1,
    targetD,
    targetH,
    targetMin
  );

  const diffSeconds = Math.floor(
    (targetDate.getTime() - new Date().getTime()) / 1000
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
