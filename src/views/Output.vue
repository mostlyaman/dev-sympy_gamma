<template>
<div class = "bg-white shadow-lg m-3 p-5 max-w-[80%] mx-auto ">
    <p class = "text-lg">{{ data.get('title') }}:</p>
    <div v-if = "data.has('input')">
        <p class="text-md font-mono "> {{ data.get('input') }}</p>
    </div>
    <hr style = "border-color: black;">
    <div class="has-math" :id = "data.get('title')">
    </div>
</div>
</template>

<script>
export default {
    name: "Output",
    props: {
        data: Map
    },
    mounted(){
        if(this.data.has('output')){
            document.getElementById(this.data.get('title')).innerHTML = this.data.get('output')
        }
        window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById(this.data.get('title'))]);
    }
}
</script>