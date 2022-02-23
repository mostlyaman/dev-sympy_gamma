<template>
<div class = "bg-white shadow-lg m-3 p-7 max-w-[80%] mx-auto ">
    <p class = "text-xl mb-2">{{data.get('title')}}</p>
    {{ data }}
</div>
</template>

<script setup>
const props = defineProps({
    data: Map
})
</script>