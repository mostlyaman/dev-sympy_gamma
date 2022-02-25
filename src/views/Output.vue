<template>
<div class = "bg-white shadow-lg m-3 p-5 max-w-[80%] mx-auto ">
    <p class = "text-lg">{{ data.get('title') }}:</p>
    <div v-if = "data.has('input')">
        <p class="text-md font-mono" > {{ data.get('input') }}</p>
    </div>
    <hr style = "border-color: black;">
    <div v-if = "data.has('output')" class = " has-math flex justify-center">
            <div v-if = "data.get('output').has('approximation')">
                $${{ data.get('output').get('tex') }} \approx {{ data.get('output').get('approximation') }}$$    
            </div>
            <div v-else>
                $${{ data.get('output').get('tex') }}$$
            </div>
    </div>
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