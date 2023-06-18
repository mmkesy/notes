<template>
  <div class="edit-note">
    <AddEditNote
      v-model:mQuery="noteContent"
      bgColor="info"
      placeholder="Edit note"
      label="pytanie 1"
      ref="addEditNoteRef"
    >
      <template #buttons>
        <div class="buttons">
        <button
          @click="$router.back()"
          class="button is-light has-background-grey-lighter mr-100"
        >
          Anuluj
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-primary "
          :disabled="!noteContent"
        >
          Zapisz
        </button>
        <button
          @click="executeQuery"
          class="button is-link has-background-info "
          :disabled="!noteContent"
        >
          Wykonaj
        </button>
      </div>
     </template>
    </AddEditNote>
    <Query
      :sqlResultFields="storeOracle.getFields"
      :sqlData="storeOracle.data"
    >
    </Query>
  </div>
</template>

<script setup>

/*
  imports
*/

  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import Query from '@/components/Notes/Query.vue' 
  import { useStoreOracle } from '@/stores/storeOracle'

/*
  router
*/

  const route = useRoute()
  const router = useRouter()

/*
  store
*/

  const storeNotes = useStoreNotes()
  const storeOracle = useStoreOracle()

/*
  note
*/

  const noteContent = ref('')

  noteContent.value = storeNotes.getNoteContent(route.params.id)

/*
  save clicked
*/

  const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }


  const executeQuery = () => {
    storeOracle.setQueryStmt(noteContent.value)
    storeOracle.executeQuery()
  }

/*
  hooks
*/  
onMounted(() => {
    storeOracle.clear()
    console.log('ViewEditNote onMounted..')
  })

</script>