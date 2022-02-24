<template>
<div class = "bg-white shadow-lg m-3 p-7 max-w-[80%] mx-auto ">
    <p class = "has-math text-xl mb-2" :id = "data.get('pre_output')">${{ data.get('pre_output') }}$</p>
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
        if(this.data.get('pre_output')){
        window.MathJax.typeset([document.getElementById(this.data.get('pre_output'))])}
    }
}
</script>