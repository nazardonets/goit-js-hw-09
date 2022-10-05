import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');
const inputDelayEl = formEl.elements['delay'];
const inputStepEl = formEl.elements['step'];
const inputAmountEl = formEl.elements['amount'];

function createPromise(position, delay) {
   const shouldResolve = Math.random() > 0.5;

   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (shouldResolve) {
            resolve({ position, delay });
         } else {
            reject({ position, delay });
         }
      }, delay);
   })
      .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            useIcon: false,
         });
      })
      .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            useIcon: false,
         });
      });
}

formEl.addEventListener('submit', e => {
   e.preventDefault();

   let numberOfRepeats = parseInt(inputAmountEl.value);
   let step = parseInt(inputStepEl.value);

   for (let i = 1; i <= numberOfRepeats; i++) {
      if (i === 1) {
         step = parseInt(inputDelayEl.value);
      }
      createPromise(i, step);
      step += parseInt(inputStepEl.value);
   }
});
