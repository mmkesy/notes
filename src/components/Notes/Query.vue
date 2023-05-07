<template>
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
</template>
<script setup>

  /*
  imports
  */


  /*
    props
  */

  const props = defineProps({
    sqlResultFields: {
      type: Object,
      required: true
    },
    sqlData: {
      type: Object,
      required: true
    },

  })

</script>  
<style>
.table-container {
  max-height: 300px;
  overflow-y: auto;
}
</style>


