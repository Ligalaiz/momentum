class Momentum {
  constructor(linkPhrase) {
    this.count = 0;
    this.i = 1;
    this.partOfDay = '';
    this.greetingPhrase = '';
    this.linkPhrase = linkPhrase;
    this.step = this.makeNewListImages();
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

    if (minutes === 0 && seconds === 0) momentum.setBg();

    setTimeout(momentum.showTime, 1000);
  }

  addZero(val) {
    return (parseInt(val) < 10 ? '0' : '') + val;
  }

  setBg() {
    let time = new Date(),
      hours = time.getHours();

    if (hours <= 6) {
      //Morning
      this.count = 20;
      this.partOfDay = 'morning';
      this.greetingPhrase = 'Good morning, ';
    } else if (hours <= 12) {
      //Day
      this.count = 21;
      this.partOfDay = 'day';
      this.greetingPhrase = 'Good day, ';
    } else if (hours <= 18) {
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

    let index = (this.i + this.step) % this.count;

    greeting.textContent = `${this.greetingPhrase}`;
    wrapper.style.backgroundImage = `url('./assets/img/${this.partOfDay}/${
      index + 1
    }.jpg')`;

    this.i++;
  }

  changeBg() {
    momentum.setBg();
  }

  initValue() {
    let objValue = { name, focus, city };
    for (let key in objValue) {
      if (localStorage.getItem(`${key}`) === null) {
        localStorage.setItem(
          `${key}`,
          `${key === 'city' ? 'Minsk' : '[Type Enter]'}`
        );
        objValue[key].value = localStorage.getItem(key);
      } else {
        objValue[key].value = localStorage.getItem(key);
      }
    }
  }

  getValue(e) {
    if (localStorage.getItem(`${e.target.getAttribute('id')}`) === null) {
      localStorage.setItem(`${e.target.getAttribute('id')}`, '[Type Enter]');
      [`${e.target.getAttribute('id')}`].value = localStorage.getItem(
        `${e.target.getAttribute('id')}`
      );
    } else {
      [`${e.target.getAttribute('id')}`].textContent = localStorage.getItem(
        `${e.target.getAttribute('id')}`
      );
    }
  }

  checkFullField(e) {
    e.target.value = '';
  }

  makeNewListImages() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  }

  setValue(e) {
    if (e.type === 'keypress') {
      if (e.code === 'Enter') {
        e.preventDefault();
        if (e.target.value === '') {
          e.target.blur();
          return;
        }
        localStorage.setItem(`${e.target.getAttribute('id')}`, e.target.value);
        e.target.blur();
      } else {
        localStorage.setItem(`${e.target.getAttribute('id')}`, e.target.value);
      }
    }
    if (e.target.value === '')
      e.target.value = localStorage.getItem(`${e.target.getAttribute('id')}`);
  }

  async setQuote() {
    try {
      const res = await fetch(this.linkPhrase);
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const data = await res.json();
      quote.textContent = data.quoteText;
      author.textContent = data.quoteAuthor;
    } catch (err) {
      console.log(`name: ${err.name} "message" ${err.message}`);
    }
  }

  changeQuote() {
    momentum.setQuote();
  }

  async getWeather() {
    let linkWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=019f42184eb4b9c9e920f1530096f08c&units=imperial`;
    try {
      const res = await fetch(linkWeather);
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°F`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `humidity: ${data.main.humidity}%`;
      wind.textContent = `wind: ${data.wind.speed}ft/s`;
    } catch (err) {
      console.log(`name: ${err.name} "message" ${err.message}`);
      city.value = `${err.message}`;
    }
  }

  setCityKey(e) {
    if (e.type === 'keypress' && e.code === 'Enter') {
      this.getWeather();
    }
  }
  setCityBlur() {
    this.getWeather();
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
  city = document.querySelector('#city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  humidity = document.querySelector('.weather-humidity'),
  wind = document.querySelector('.weather-wind');

const momentum = new Momentum(linkPhrase);

switcherBg.addEventListener('click', momentum.changeBg);

name.addEventListener('blur', momentum.setValue);
name.addEventListener('keypress', momentum.setValue);
name.addEventListener('focus', momentum.checkFullField);

focus.addEventListener('blur', momentum.setValue);
focus.addEventListener('keypress', momentum.setValue);
focus.addEventListener('focus', momentum.checkFullField);

quoteBtn.addEventListener('click', momentum.changeQuote);
document.addEventListener('DOMContentLoaded', momentum.getWeather);

city.addEventListener('blur', (e) => {
  momentum.setValue(e);
  momentum.setCityBlur();
});

city.addEventListener('keypress', (e) => {
  momentum.setValue(e);
  momentum.setCityKey(e);
});

city.addEventListener('focus', momentum.checkFullField);

momentum.setBg();
momentum.showTime();
momentum.setQuote();
momentum.initValue();
