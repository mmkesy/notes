import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { InstallCodemirro } from "codemirror-editor-vue3"  
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

createApp(App)
  .use(pinia)
  .use(router)
  .use(InstallCodemirro) 
  .mount('#app')
