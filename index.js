const reloadClock = () => {
  console.log("1000");
  const clock = document.getElementsByClassName("clock");
  const seconds = new Date().getSeconds();
  clock[0].innerHTML = seconds;
};

setInterval(reloadClock, 1000);
