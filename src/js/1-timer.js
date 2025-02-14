import flatpickr from "flatpickr";
import iziToast from "izitoast";

const imputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const daysEl = document.querySelector('.js-timer-days');
const hoursEl = document.querySelector('.js-timer-hours');
const minutesEl = document.querySelector('.js-timer-minutes');
const secondsEl = document.querySelector('.js-timer-seconds');

let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      userSelectedDate = selectedDates[0];
      iziToast.success({
        title: 'OK',
        message: 'Valid date selected',
      });
      startBtn.disabled = false;
    }
  },
};

startBtn.disabled = true;
flatpickr(imputEl, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  imputEl.disabled = true;
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

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

const addLeadingZero = value => value.toString().padStart(2, '0');