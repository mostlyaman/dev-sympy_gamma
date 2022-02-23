<template>
<div class = "bg-white shadow-lg m-3 p-3 max-w-[80%] mx-auto ">
    {{ data }}
</div>
</template>

<script setup>
const props = defineProps({
    data: Map
})
</script>