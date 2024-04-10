import { createApp } from 'vue'
import router from '@/router/index'
import App from '@/App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Firebase
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/firebase/index.js'

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(router)
app.use(vuetify)

//Need to wait until ready as route params not available on created/setup while using vue-router-4
await router.isReady()
app.mount('#app')
