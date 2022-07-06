# Vanilla Example

An example with just html, javascript, and css. 

The site is live [here](https://62c5f9ae1ad0d114099d3f4c--tubular-biscuit-61fe95.netlify.app).

![Vailla Demo](vanilla-demo.png)

## The Code

Also avliable [here on github](https://github.com/nickgraffis/headless-calendar-fns/tree/master/examples/vanilla).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: #cbd5e1;
      background-color: #1e293b;
    }

    .w-5 {
      width: 1.25rem;
    }

    .h-5 {
      height: 1.25rem;
    }

    .calendar {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    #calendar {
      flex-grow: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .week {
      display: flex;
      flex-grow: 1;
      height: 100%;
    }

    .day {
      flex-grow: 1;
      border: 1px solid #475569;
      padding: 10px;
      text-align: center;
      position: relative;
    }

    .day-number {
      font-weight: 700;
      font-size: 1em;
      position: absolute;
      top: 1;
      left: 1;
    }
  </style>
</head>
<body>
  <div class="calendar">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <p id="current-month" style="font-size: 30px; font-weight: 900;"></p>
      <div style="display: flex; align-items: center;">
        <svg id="prev" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span id="today">Today</span>
        <svg id="next" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <div id="calendar"></div>
  </div>
  <script src="headless-calendar-fns.umd.js"></script>
  <script>
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var createCalendar = window["headless-calendar-fns"]
    var currentMonth = new Date().getMonth()
    var currentYear = new Date().getFullYear()
    var matrix = createCalendar({
      view: 'month',
      year: currentYear,
      month: currentMonth,
    })

    var calendar = document.getElementById('calendar')
    
    function createCal() {
      for (let i = 0; i < matrix.current.weeks.length; i++) {
        calendar.innerHTML += /*html*/`
          <div class="week">
            ${matrix.current.weeks[i].days.map(day => /*html*/`
              <div class="day">
                <div class="day-number">${parseInt(day.date.split('-')[2])}</div>
              </div>
            `).join('')}
          </div>
        `
      }
    }

    document.querySelector('#next').addEventListener('click', () => {
      if (currentMonth === 11) {
        currentMonth = 0
        currentYear++
      } else {
        currentMonth++
      }

      matrix = createCalendar({
        view: 'month',
        year: currentYear,
        month: currentMonth,
      })
      document.querySelector('#current-month').innerHTML = `${months[currentMonth]} ${currentYear}`
      calendar.innerHTML = ''
      createCal()
    })

    document.querySelector('#prev').addEventListener('click', () => {
      if (currentMonth === 0) {
        currentMonth = 11
        currentYear--
      } else {
        currentMonth--
      }

      matrix = createCalendar({
        view: 'month',
        year: currentYear,
        month: currentMonth,
      })

      document.querySelector('#current-month').innerHTML = `${months[currentMonth]} ${currentYear}`
      calendar.innerHTML = ''
      createCal()
    })

    document.querySelector('#today').addEventListener('click', () => {
      currentMonth = new Date().getMonth()
      currentYear = new Date().getFullYear()
      matrix = createCalendar({
        view: 'month',
        year: currentYear,
        month: currentMonth,
      })

      document.querySelector('#current-month').innerHTML = `${months[currentMonth]} ${currentYear}`
      calendar.innerHTML = ''
      createCal()
    })

    document.querySelector('#current-month').innerHTML = `${months[currentMonth]} ${currentYear}`
    createCal()
  </script>
</body>
</html>
```