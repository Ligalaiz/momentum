class Momentum {
  constructor(linkPhrase) {
    this.count = 0;
    this.i = 1;
    this.partOfDay = '';
    this.greetingPhrase = '';
    this.linkPhrase = linkPhrase;
  }

  showTime() {
    let time = new Date(),
      hour = time.getHours(),
      minutes = time.getMinutes(),
      seconds = time.getSeconds(),
      dayNow = time.getDay(),
      dateNow = time.getDate(),
      monthNow = time.getMonth();

    const amPm = hour >= 12 ? 'PM' : 'AM';

    const weekDays = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };

    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };

    showDate.innerHTML = `${weekDays[+dayNow]}, ${dateNow} ${
      months[+monthNow]
    }`;
    showTime.innerHTML = `${momentum.addZero(
      hour
    )}<span>:</span>${momentum.addZero(
      minutes
    )}<span>:</span>${momentum.addZero(seconds)} ${amPm}`;

    if (minutes === 0) momentum.setBg();

    setTimeout(momentum.showTime, 1000);
  }

  addZero(val) {
    return (parseInt(val) < 10 ? '0' : '') + val;
  }

  setBg() {
    let time = new Date(),
      hours = time.getHours();

    if (hours < 6) {
      //Morning
      this.count = 20;
      this.partOfDay = 'morning';
      this.greetingPhrase = 'Good morning, ';
    } else if (hours < 12) {
      //Day
      this.count = 21;
      this.partOfDay = 'day';
      this.greetingPhrase = 'Good day, ';
    } else if (hours < 18) {
      //Evening
      this.count = 23;
      this.partOfDay = 'evening';
      this.greetingPhrase = 'Good evening, ';
    } else {
      // Night
      this.count = 22;
      this.partOfDay = 'night';
      this.greetingPhrase = 'Good night, ';
    }

    let index = this.i % this.count;

    greeting.textContent = `${this.greetingPhrase}`;
    wrapper.style.backgroundImage = `url('./assets/img/${this.partOfDay}/${
      index + 1
    }.jpg')`;

    this.i++;
  }

  changeBg() {
    momentum.setBg();
  }

  getName() {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Type Enter]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }

  getFocus() {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Type Enter]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  }
}

const showTime = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus'),
  wrapper = document.getElementById('wrapper'),
  showDate = document.getElementById('date'),
  switcherBg = document.getElementById('switcherBg'),
  quote = document.querySelector('.quote__phrase'),
  author = document.querySelector('.quote__author'),
  quoteBtn = document.getElementById('quote-btn'),
  linkPhrase = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`,
  city = document.querySelector('.city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description');

const momentum = new Momentum(linkPhrase);

switcherBg.addEventListener('click', momentum.changeBg);

momentum.showTime();
momentum.setBg();
momentum.getName();
momentum.getFocus();
