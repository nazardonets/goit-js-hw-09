import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
   daysValueEl: document.querySelector('[data-days]'),
   hoursValueEl: document.querySelector('[data-hours]'),
   minutesValueEl: document.querySelector('[data-minutes]'),
   secondsValueEl: document.querySelector('[data-seconds]'),
   startBtnEl: document.querySelector('[data-start]'),
};

const {
   daysValueEl,
   hoursValueEl,
   minutesValueEl,
   secondsValueEl,
   startBtnEl,
} = refs;

let selectedUnixTimestamp = null;

function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

   return { days, hours, minutes, seconds };
}

function formatOutputValue(num) {
   return num.toString().padStart(2, '0');
}

const datePicker = flatpickr('#datetime-picker', {
   enableTime: true,
   time_24hr: true,
   minuteIncrement: 1,

   onChange(selectedDates) {
      selectedUnixTimestamp = Date.parse(selectedDates[0]);

      if (selectedDates[0] > Date.now()) {
         startBtnEl.disabled = false;
      }
   },

   onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
         Notify.failure(
            'Вечірка на Щекавиці не може бути в минулому. Виберіть дату в майбутньому.',
            {
               timeout: 5000,
            }
         );

         startBtnEl.disabled = true;
      }
   },
});

function startCountdown() {
   setInterval(() => {
      let remainingTime = convertMs(selectedUnixTimestamp - Date.now());
      daysValueEl.innerHTML = formatOutputValue(remainingTime.days);
      hoursValueEl.innerHTML = formatOutputValue(remainingTime.hours);
      minutesValueEl.innerHTML = formatOutputValue(remainingTime.minutes);
      secondsValueEl.innerHTML = formatOutputValue(remainingTime.seconds);
   }, 1000);
}

startBtnEl.addEventListener('click', e => {
   if (datePicker.input.value !== '') {
      startBtnEl.disabled = true;
      datePicker.input.disabled = true;
      Notify.success('Відлік до вечірки на Щекавиці розпочато! 🚀', {
         timeout: 4000,
      });
      startCountdown();
   }
});
