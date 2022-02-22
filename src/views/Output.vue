<template>
<div>
    {{ data }}
</div>
</template>

<script setup>
const props = defineProps({
    data: Map
})
</script>