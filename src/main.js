import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import messages from './locales/messages'




const i18n = createI18n({
    locale: localStorage.getItem("Lan"),
    fallbackLocale: 'uz',
    messages
  })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
