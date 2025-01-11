import flatpickr from "flatpickr";
import iziToast from "izitoast";

const timerInput = document.querySelector('#datetime-picker');
const btnTimerInput = document.querySelector('[data-start]');

const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSecond = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerCalc = null;

btnTimerInput.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()){
      btnTimerInput.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      btnTimerInput.disabled = false;

      iziToast.success({
        title: 'Success',
        message: 'Valid date selected!',
      });
    }

    if (userSelectedDate > Date.now()) {
      btnTimerInput.disabled = false;
    }
  }
});

btnTimerInput.addEventListener('click', () => {
    btnTimerInput.disabled = true;
    timerInput.disabled = true;

    timerCalc = setInterval(() => {
        const timeDiff = userSelectedDate - Date.now();

        if (timeDiff <= 0) {
            clearInterval(timerCalc);

            btnTimerInput.disabled = false;
            return;
        }

        const timeDiffConvert = convertMs(timeDiff);

         fieldDays.textContent = addLeadingZero(timeDiffConvert.days);
         fieldHours.textContent = addLeadingZero(timeDiffConvert.hours);
         fieldMinutes.textContent = addLeadingZero(timeDiffConvert.minutes);
         fieldSecond.textContent = addLeadingZero(timeDiffConvert.seconds);
}, 1000);
});

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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}