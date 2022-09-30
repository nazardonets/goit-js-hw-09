const refs = {
   startBtnEl: document.querySelector('button[data-start]'),
   stopBtnEl: document.querySelector('button[data-stop]'),
   bodyEl: document.querySelector('body'),
};

const { startBtnEl, stopBtnEl, bodyEl } = refs;

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
   bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
}

let interval = null;

stopBtnEl.disabled = true;

bodyEl.addEventListener('click', e => {
   if (e.target === startBtnEl) {
      startBtnEl.disabled = true;
      stopBtnEl.disabled = false;

      interval = setInterval(() => {
         changeBodyColor();
      }, 1000);
   }

   if (e.target === stopBtnEl) {
      startBtnEl.disabled = false;
      stopBtnEl.disabled = true;

      clearInterval(interval);
   }
});
