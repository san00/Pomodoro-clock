const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let Clock = {

  start: function(seconds) {
    this.seconds = seconds || this.seconds;
    displayTimeLeft(this.seconds);
    this.interval = setInterval(() => {
      this.seconds -= 1;

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
  // reset: function() {
  //   this.pause();
  //   displayTimeLeft(this.seconds);
  // }
}

document.querySelectorAll(".timer__button").forEach(button => button.addEventListener('click', () => {
  if (button.id === "button1") {
    Clock.pause();
    Clock.start(5);


  } else if (button.id === "button2") {
    Clock.pause();
    Clock.start(25);
  }

}));

document.querySelector(".stop__button").addEventListener('click', () => Clock.pause());
document.querySelector(".resume__button").addEventListener('click', () => Clock.resume());

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
Clock.start(1500);
Clock.pause();

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  Clock.pause();
  Clock.start(mins * 60);
});
