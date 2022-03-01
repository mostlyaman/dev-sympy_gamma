<template>
<!-- create box + red border if it is a error block -->
<div :class = "'bg-white m-2 p-5 w-[80vw] mx-auto '+
    (data.has('error') ? 'outline outline-2 outline-red-600' : '')">

    <!-- title -->
    <p class = "text-lg">{{ data.get('title') }}:</p>

    <!-- input -->
    <div v-if = "data.has('input')">
        <p class="text-md font-mono text-gray-600"> {{ data.get('input') }}</p>
    </div>
    <hr style = "border-color: black;">

    <!-- content -->
    <div class="has-math" :id = "data.get('title')">
    <span v-html="output_html_to_div">
        
    </span>
    </div>

    <!-- error -->
    <div class = "font-mono text-sm bg-slate-100 p-2 my-3 text-gray-700" v-if = "data.has('error')">
        {{ data.get('error') }}
    </div>
    
</div>
</template>

<script>
export default {
    name: "Output",
    props: {
        data: Map,
        evaluated_result: Object
    },
    mounted(){
        if(this.data.get('input')){
            this.$emit('eval-input', {from: this.data.get('title'), input_expr: this.data.get('input')})
        }
        window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById(this.data.get('title'))]);
    },
    computed: {
        output_html_to_div(){
            let output = ""
            if(this.data.get('title') === "Plot"){
                output =  ""
            }else if(this.data.has('output')){
                output = this.data.get('output')
            }else if(this.evaluated_result[this.data.get('title')]){
                output =  "<script type=\"math/tex; mode=display\">" + this.evaluated_result[this.data.get('title')] + "<\/script>"
            }else{
                output = ""
            }
            setTimeout(() => {window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById(this.data.get('title'))])}, 100)
            return output
        }
    }
}
</script>