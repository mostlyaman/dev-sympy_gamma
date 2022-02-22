<script setup>

const props = defineProps({
  isloaded: String
})
</script>

<template>
  <div class = "text-center m-7 text-lg">
    
    <div v-if="isloaded.startsWith('Error:')">
      {{ isloaded }}
      <p class="p-3">
        <a href="https://github.com/mostlyaman/scuffed-sympy-gamma/issues" class = "underline text-blue-600 hover:text-blue-800" target = "_blank">
          Report this issue here.
        </a>
      </p>
    </div>

    <div v-else-if = "(isloaded!=='Finished Loading')" >
      {{ isloaded }}
    </div>
    
    <div v-else>
      Useful Content
    </div>
  </div>
</template>
