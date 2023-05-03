<template>
  <div
    class="card p-1 mb-5"
    :class="`has-background-${ bgColor }-light`"
  >
    <label
      v-if="label"
      class="label has-text-grey-light"
    >
      {{ label }}
    </label>
   <!--
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          maxlength="100"
        />
      </div>
    </div>
  -->  
  <!--
        @change="onChange"
        @input="onInput"
        @ready="onReady"
  -->     
    <div class="field">
      <div class="control">
        <Codemirror
        :value="modelValue"
        :options="cmOptions"
        :placeholder="placeholder"
        ref="cmRef"   
        @change="onChange"
        @input="onInput"
        v-autofocus
        >
        </Codemirror>
      </div>  
    </div>  
  
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>  
</template>

<script setup>


  import { ref } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'
  import "codemirror/mode/sql/sql.js"
  import "codemirror/addon/edit/matchbrackets.js"
  import Codemirror from "codemirror-editor-vue3"


  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'info'
    },
    placeholder: {
      type: String,
      default: 'select...'
    },
    label: {
      type: String
    }
  })


  const emit = defineEmits(['update:modelValue'])

  

 /* 
  codemirror editor
*/
  
  const cmOptions = {
    mode: "sql",
    matchBrackets: true
  }

  const cmRef = ref(null)

  const onChange = (val, cm) => {
        //console.log(val)
        emit('update:modelValue', cm.getValue())
  }

  const onInput = (val) => {
        //console.log(val)
  }


  const focusCodeMirror = () => {
    cmRef.value.focus()
  }

  defineExpose({
    focusCodeMirror
  })


</script>
<style>
.codemirror-container {
  font-size: 1.3em;
  
}
.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like {
  font-family: Monospace !important;
}
.CodeMirror-gutter-wrapper {
  font-family: Monospace !important;
  font-size : 0.6em;
}
.cm-s-default .cm-comment {
    color: #ccc;
}
</style>