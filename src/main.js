import './assets/styles.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from './store'

const app = createApp(App);

app.use(setupStore());

app.mount('#app');

