<template>
  <div class="notes">

    <AddEditNote
      v-model="newNote"
      placeholder=""
      ref="addEditNoteRef"
    >
      <template #buttons>
        <button
          @click="executeQuery"
          :disabled="!newNote"
          class="button is-link has-background-info-dark mr-2"
        >
          Execute
        </button>
        <button
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-info-dark"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    
    <progress
      v-if="!storeNotes.notesLoaded" 
      class="progress is-large is-info"
      max="100"
    />
    

    <Note
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
      @deleteCancelled="deleteCancelled"
    />

    <div
      class="is-size-4 has-text-centered has-text-grey-light py-4"
      v-if="!storeNotes.notes.length && storeNotes.notesLoaded"      
    >
        Nie wpisano jeszcze notatek...  
    </div>

  </div>
</template>

<script setup>

/*
  imports
*/

  import { onActivated, onMounted, onUpdated, ref } from 'vue'
  import Note from '@/components/Notes/Note.vue'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import axios from 'axios' 
  //import { useWatchCharacters } from '@/use/useWatchCharacters'

/*
  store
*/

  const storeNotes = useStoreNotes()


/*
  notes
*/

  const newNote = ref('')
  const addEditNoteRef = ref(null)

  const executeQuery = () => {
    console.log('executing query...')
    //let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}`
    let apiUrl = `https://pmat.macforsoft.pl/api/sqlres`
    const params = {
                    query: 'select * from autor'
    }
    
    axios.get(apiUrl,{params}).then( result => {
      console.log('result:',result.data)
    }).catch( err => {
      console.log('err:',err)
    })
  }

  const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusCodeMirror()

  }

  const deleteCancelled = () => {
    addEditNoteRef.value.focusCodeMirror()
    console.log('focus restored..')
  }

  onMounted(() => {
    console.log('ViewNotes onMounted..')
  })

  onUpdated(() => {
    addEditNoteRef.value.focusCodeMirror()
    console.log('ViewNotes onUpdated..')
  })


/*
  watch characters
*/

  //useWatchCharacters(newNote)

</script>