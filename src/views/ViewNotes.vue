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

    <div class="table-container">
      <table class="table is-fullwidth is-scrollable has-sticky-header">
        <!-- Your table content -->
        
        <thead>
          <tr>
            <th v-for="field in sqlResultFields" :key="field">
              {{ field }}
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="item in sqlData" :key="item">
            <td v-for="key in item">
              {{ key }}
            </td>
          </tr>
        </tbody>
      
      </table>
    </div>

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

  const sqlData = ref(
    [{"id":"1","imie":"Zygmunt","nazwisko":"Bajkowski"},
     {"id":"2","imie":"Kunegunda","nazwisko":"Esflubowska"},
     {"id":"3","imie":"Janina","nazwisko":"Zursynowa"},
     {"id":"4","imie":"Bonifacy","nazwisko":"Miejski"}
    ]
  ) 


  const executeQuery = () => {
    console.log('executing query...')
    //let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}`
    let apiUrl = `https://pmat.macforsoft.pl/api/sqlres`
    const params = {
                    query: newNote.value
    }
    
    axios.get(apiUrl,{params}).then( result => {
      
      let  resData = result.data,
           arrJSON = []

      try {
          arrJSON = typeof resData != 'object' ? JSON.parse(resData) : resData

          if (arrJSON.length==0) {      
          sqlData.value = [{"Info":"brak danych"}]
          }
          else  sqlData.value = resData
      }
      catch  {
        sqlData.value = [{"Błąd":resData}]  
      }
      
    }).catch( err => {
      sqlData.value = [{"Błąd":err}]
    })
  }

  const fiilTable = () => {
    
  }

  const sqlResultFields = computed ( () => {
    let firstRow = sqlData.value[0],
        resultFields = []
    for (const item in firstRow) { 
      console.log(item)
      resultFields.push(item)
    }    

    return resultFields
  })

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
<style>
.table-container {
  max-height: 150px;
  overflow-y: auto;
}
</style>