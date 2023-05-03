<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
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
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-primary "
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </div>
     </template>
    </AddEditNote>
  </div>
</template>

<script setup>

/*
  imports
*/

  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'

/*
  router
*/

  const route = useRoute()
  const router = useRouter()

/*
  store
*/

  const storeNotes = useStoreNotes()

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

</script>