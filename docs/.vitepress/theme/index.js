import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Zodiac from '../../components/Zodiac.vue'
import Calendar from '../../components/Calendar.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Zodiac', Zodiac),
    app.component('Calendar', Calendar)
  }
}
