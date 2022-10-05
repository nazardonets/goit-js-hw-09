import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');
const inputDelayEl = formEl.elements['delay'];
const inputStepEl = formEl.elements['step'];
const inputAmountEl = formEl.elements['amount'];
const submitBtnEl = formEl.querySelector('button[type="submit"]');

function createPromise(position, delay) {
   delay = delay + parseInt(inputStepEl.value);
   const shouldResolve = Math.random() > 0.5;

   const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
         if (shouldResolve) {
            resolve({ position, delay });
         } else {
            reject({ position, delay });
         }
      }, delay);
   })
      .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

   return promise;
}

formEl.addEventListener('submit', e => {
   e.preventDefault();

   let numberOfRepeats = parseInt(inputAmountEl.value);
   let step = parseInt(inputStepEl.value);

   for (i = 1; i <= numberOfRepeats; i++) {
      createPromise(i, step);
      step += parseInt(inputStepEl.value);
   }
});
