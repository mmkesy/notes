import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useStoreNotes } from '@/stores/storeNotes'



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
      user: {}
    }
  },
  actions: {
    init(){
      const storeNotes = useStoreNotes()
      onAuthStateChanged(auth, (user) => {
        if (user) {

          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          storeNotes.init()
        } else {
          // User is signed out
          // ...
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes()
        }
      })
    },
    registerUser(credentials){

      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
        // ..
      });      
    
    },

    loginUser(credentials){

      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        console.log('Error:',error.errorMessage)
      });
      
    },

    logoutUser() {

      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });

    },

  }

})