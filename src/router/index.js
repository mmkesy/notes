import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import { auth } from '@/js/firebase'




const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach(async (to, from) => {

  const storeAuth = useStoreAuth()
  const user = await new Promise((resolve, reject) => auth.onAuthStateChanged(resolve, reject)) // czekanie na zakonczenie inicjalizacji logowania
  if (!storeAuth.user.id && to.name !== 'auth') { // nie zalogowany user nie moze wchodzic na inne strony poza login albo register
    return { name: 'auth' }
  }
  if (storeAuth.user.id && to.name === 'auth') {  // zalogowany user nie moze widziec strony logowania
    return false                                         // store user to go
  }  
})


export default router