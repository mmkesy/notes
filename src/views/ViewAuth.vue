<template> 
  <div class="auth"
  >
    <div class="tabs is-centered">
      <ul>
        <li
          :class= "{'is-active': !register }"
        >
          <a @click.prevent="register=false">Logowanie</a>
        </li>
        <li
          :class= "{'is-active': register }"
        >
          <a @click.prevent="register=true">Rejestracja</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="subtitle is-6 has-text-right">{{ formTitle }}</div>
        
        <form
          @submit.prevent="onSubmit"
        >
          <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="credentials.email"
              class="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
            >
          </div>
          </div>

          <div class="field">
          <label class="label">Hasło</label>
          <div class="control">
            <input
              v-model="credentials.password"
              class="input"
              type="password"
              placeholder="enter a password"
            >
          </div>
          </div>

          <div class="field is-grouped is-grouped-right">
          <p class="control">
            <button class="button is-primary">
              {{ ButtonOkTitle }}
            </button>
          </p>
          </div>
        
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, reactive} from 'vue'
  import { useStoreAuth } from '@/stores/storeAuth'

  const storeAuth = useStoreAuth()
  const register = ref(false)

  const formTitle = computed (()=> { 
    return register.value ? '' : ''
  })

  const ButtonOkTitle = computed (()=> { 
    return register.value ? 'Dalej' : 'Dalej'
  })

  const onSubmit = () => {
    if (register.value) {
      storeAuth.registerUser(credentials)
    }
    else {
      storeAuth.loginUser(credentials)
    }

  }

  const credentials = reactive({
    email: '',
    password: ''
  })
</script>
<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>