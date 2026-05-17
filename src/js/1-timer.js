
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");
const timerFiels = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};
startBtn.disabled = true;
let userSelectedDate = null;
let timerId = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight",
            });
            startBtn.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startBtn.disabled = false;
        }
    },
};

flatpickr(input, options);

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    input.disabled = true;
   timerId = setInterval(() => {
    const currentTime = Date.now();
    const ms = userSelectedDate - currentTime;
    if (ms <= 0) {
      clearInterval(timerId);
      input.disabled = false;
         updateTimerDisplay(0, 0, 0, 0);
        return;
    } 
    const { days, hours, minutes, seconds } = convertMs(ms);
    updateTimerDisplay (days, hours, minutes, seconds );
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
  return String(value).padStart(2, '0');
}
function updateTimerDisplay ( d, h, m, s ) {
  timerFiels.days.textContent = addLeadingZero(d);
  timerFiels.hours.textContent = addLeadingZero(h);
  timerFiels.minutes.textContent = addLeadingZero(m);
  timerFiels.seconds.textContent = addLeadingZero(s);
}


