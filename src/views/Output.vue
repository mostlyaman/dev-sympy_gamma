<template>
<div class = "bg-white shadow-lg m-3 p-5 max-w-[80%] mx-auto ">
    <p class = "text-lg">{{ data.get('title') }}:</p>
    <div v-if = "data.has('input')">
        <p class="text-md font-mono "> {{ data.get('input') }}</p>
    </div>
    <hr style = "border-color: black;">
</div>
</template>

<script>
export default {
    name: "Output",
    props: {
        data: Map
    },
    created(){
    },
    mounted(){
        window.MathJax.typesetPromise(document.getElementsByClassName('has-math'))
    }
}
</script>