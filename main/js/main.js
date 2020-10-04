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

    setTimeout(momentum.showTime, 1000);
  }

  addZero(val) {
    return (parseInt(val) < 10 ? '0' : '') + val;
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

momentum.showTime();
