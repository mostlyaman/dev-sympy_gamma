<template>
<div class = "bg-white shadow-lg m-3 p-7 max-w-[80%] mx-auto ">
    <p class = "text-xl mb-2">{{ data.get('title') }}</p>
    <div v-if = "data.has('output')" class = "has-math m-4" text-lg>
        Output: $ {{ data.get('output').get('tex') }} $
    </div>
    {{ data }}
</div>
</template>

<script>
export default {
    name: "Output",
    props: {
        data: Map
    },
    mounted(){ 
        window.MathJax.typesetPromise(document.getElementsByClassName('has-math'))
    }
}
</script>