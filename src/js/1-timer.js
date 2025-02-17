import flatpickr from "flatpickr";
import iziToast from "izitoast";

const imputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
let userSelectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      iziToast.success({
        title: 'OK',
        message: 'Valid date selected',
      });
      startBtn.disabled = false;
    }
  },
};

flatpickr(imputEl, options);
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
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}
let timerInterval = null;

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  imputEl.disabled = true;
  startBtn.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      imputEl.disabled = false;
      return;
    }

    const timeComponents = convertMs(timeDifference);
    updateTimerInterface(timeComponents);
  }, 1000);
});