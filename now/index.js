const currentURLStr = window.location.href;
const currentURL = new URL(currentURLStr);
const UrlPrams = currentURL.searchParams;
const type = UrlPrams.get("type");
const color = UrlPrams.get("color");

const reloadClock = () => {
  const $clock = document.getElementById("clock");

  // 日時を取得する
  const currentDate = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );

  const years = currentDate.getFullYear();
  const months = currentDate.getMonth() + 1;
  const days = currentDate.getDay();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  if (seconds < 10) seconds = "0" + seconds;

  // 時刻の色を設定する
  let fontColor = color ?? "black";

  if (type === "long") {
    const result = `${years}/${months}/${days} ${hours}:${minutes}:${seconds}`;
    $clock.style.color = fontColor;
    $clock.innerHTML = result;
  } else {
    const result = `${hours}:${minutes}:${seconds}`;
    $clock.style.color = fontColor;
    $clock.innerHTML = result;
  }
};

reloadClock();
setInterval(reloadClock, 1_000);
