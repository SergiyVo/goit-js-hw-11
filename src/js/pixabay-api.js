import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

let userSelectedDate;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 

    if (userSelectedDate < new Date) {
      btnStart.disabled = true;
      iziToast.show({
        message: 'Please, choose a date in the future!',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });      
    } else {
      btnStart.disabled = false;
      btnStart.classList.add('button-start-date');
    }  
    
  },
};

flatpickr(input, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function tick({ days, hours, minutes, seconds }) {
  day.textContent = `${addLeadingZero(days)}`
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onBtnClick() {
  btnStart.disabled = true;
  btnStart.classList.remove('button-start-date');
  input.disabled = true;

  let differenceTime = userSelectedDate - Date.now();
  const intervalId = setInterval(() => { 
    differenceTime -= 1000;
    const timeObj = convertMs(differenceTime);
    tick(timeObj);
    
    if (differenceTime <= 1000) {
      clearInterval(intervalId);
      input.disabled = false;
    }

  }, 1000);
}

btnStart.addEventListener('click', onBtnClick);
