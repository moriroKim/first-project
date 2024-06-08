/*
  Reference: https://css-tricks.com/restart-css-animation/
*/

element = document.getElementById("dynamic-island");

element.addEventListener("click", function(e) {
  e.preventDefault;
  
  // -> removing the class
  element.classList.remove("bounce");
  
  // -> triggering reflow /* The actual magic */
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
  element.offsetWidth = element.offsetWidth;
  
  // -> and re-adding the class
  element.classList.add("bounce");
}, false);

//현재 시간 기능
const clock = document.getElementById('time');

setInterval(() => {
    let date = new Date();
    let hour = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');

    clock.textContent = `${hour}:${minutes}:${second}`;
}, 1000);