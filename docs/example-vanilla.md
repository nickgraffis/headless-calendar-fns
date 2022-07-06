# Vanilla Example

An example with just html, javascript, and css 🍦. 

The site is live [here](https://tubular-biscuit-61fe95.netlify.app).

![Vailla Demo](vanilla-demo.png)

## The Code

Also avliable [here on github](https://github.com/nickgraffis/headless-calendar-fns/blob/master/examples/index.html).

```html {16-39}
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
   /* Styles Here */
  </style>
</head>
<body>
  <div class="calendar">
    <!-- Heading and Buttons -->
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
                <div class="day-number ${day.isToday && 'active'}">${parseInt(day.date.split('-')[2])}</div>
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