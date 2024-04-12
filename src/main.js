import { createApp } from 'vue'
import router from '@/router/index'
import App from '@/App.vue'

// Import CSS
import '@/assets/scss/main.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Firebase
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/firebase/index.js'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import useFirestore from '@/composables/useFirestore'
import useUser from '@/composables/useUser'

// Initialize Firebase
initializeApp(firebaseConfig)

// Create App
const app = createApp(App)

// Initialize Firestore
const firestore = useFirestore()
const user = useUser()
const db = getFirestore()
firestore.setDB(db)

onAuthStateChanged(getAuth(), (currentUser) => {
  user.setCurrentUser(currentUser)
})

// Create vuetify
const vuetify = createVuetify({
  components,
  directives
})

app.use(router)
app.use(vuetify)

app.mount('#app')
