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

    <Query
      :sqlResultFields="storeOracle.getFields"
      :sqlData="storeOracle.data"
    >
    </Query>
    
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

  import { onActivated, onMounted, onUpdated, ref, reactive, computed } from 'vue'
  import Note from '@/components/Notes/Note.vue'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import axios from 'axios'
  import Query from '@/components/Notes/Query.vue' 
  import { useStoreOracle } from '@/stores/storeOracle'
  //import { useWatchCharacters } from '@/use/useWatchCharacters'

/*
  store
*/

  const storeNotes = useStoreNotes()
  const storeOracle = useStoreOracle()

/*
  notes
*/

  const newNote = ref('')
  const addEditNoteRef = ref(null)


  const executeQuery = () => {

    storeOracle.setQueryStmt(newNote.value)
    storeOracle.executeQuery()
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
    storeOracle.clear()
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
