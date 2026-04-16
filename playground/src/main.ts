import { createApp } from 'vue'
import App from './App.vue'
import { createGkKit } from 'god-kit/vue/config'

import 'god-kit/tokens.css'

const app = createApp(App)
app.use(
  createGkKit({
    theme: { defaultTheme: 'light' },
  })
)
app.mount('#app')
