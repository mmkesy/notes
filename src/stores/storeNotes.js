import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from 'firebase/firestore'
import { useStoreAuth } from '@/stores/storeAuth'


let notesCollectionRef
let notesCollectionQuery

let unSubscribe = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [],
      notesLoaded: false
    }
  },
  actions: {

    init() {
      const storeAuth = useStoreAuth() 
      notesCollectionRef = collection(db, 'users',storeAuth.user.id,'notes')            
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
      this.getNotes()
    },

    getNotes() {      
      
      // odswiezanie na biezaco :-)
        if(unSubscribe) unSubscribe() // unsubcribe listener prevesly established
        
        unSubscribe = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        this.notesLoaded = false
        querySnapshot.forEach((doc) => {
          let note = {
            id : doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        });

        setTimeout(() => {
          this.notes = notes            
          this.notesLoaded = true
        }, 1000)

        

        
        
      }, error =>{
          console.log('error.message:',error.message)
      });

    },

    clearNotes() {
      this.notes = [];
      if(unSubscribe) unSubscribe() // unsubcribe listener prevesly established
    },

    async addNote(newNoteContent) {

      let currentDate = new Date().getTime(),
          date = currentDate.toString()

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date   
      })

    },

    async deleteNote(idToDelete) {
      //this.notes = this.notes.filter(note => note.id !== idToDelete )
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },

    async updateNote(id, content) {
      //let index = this.notes.findIndex(note => note.id === id )
      //this.notes[index].content = content
      await updateDoc(doc(notesCollectionRef, id), {
        content
      })
    }  
  },

  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})