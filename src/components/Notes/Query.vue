<template>
  <div class="table-container">
    <table class="table is-fullwidth is-scrollable has-sticky-header">
      <!-- Your table content -->        
      <thead>
        <tr>
          <th v-for="(field,n) in sqlResultFields" :key="n">
            {{ field }}
          </th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="(item,n) in sqlData" :key="n">
          <td v-for="(key,n) in item" :key="n">
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


