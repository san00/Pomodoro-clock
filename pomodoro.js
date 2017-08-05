const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let Clock = {

  seconds: 10,

  start: function() {
    let self = this;

    this.interval = setInterval(() => {
      this.seconds = --this.seconds;
      //check if we should stop it
      if (this.seconds < 0) {
        clearInterval(this);
        return;
      }
      //display it
      displayTimeLeft(this.seconds);

    }, 1000)
  },

  pause: function() {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function() {
    if (!this.interval) {
      this.start();
    };

  },
  reset: function() {
    this.pause();
    displayTimeLeft(this.seconds);
  }
}

Clock.reset();
Clock.start();

document.querySelector(".stop__button").addEventListener('click', () => Clock.pause());
document.querySelector(".resume__button").addEventListener('click', () => Clock.resume());

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});