
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyALTs1PO8c76A03YJZqq7Mx3YYhmU69LUU",
  authDomain: "fire-notes-mk.firebaseapp.com",
  projectId: "fire-notes-mk",
  storageBucket: "fire-notes-mk.appspot.com",
  messagingSenderId: "1061064156487",
  appId: "1:1061064156487:web:7d5724274fcf1529fa9862"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)


export {
    db,
    auth
}
