<template>
<!-- create box + red border if it is a error block -->
<div :class = "'bg-white m-2 p-5 w-[80vw] mx-auto '+
    (data.has('error') ? 'outline outline-2 outline-red-600' : '')">
    <div v-if = "data.has('ambiguity')">

        <!-- ambiguity -->
    <p text = "text-md"  class = "text-center">
        Did you mean <router-link :to="'/input/'+data.get('ambiguity')" class = "font-mono underline text-blue-600 hover:text-blue-800">{{data.get('ambiguity')}}</router-link> ?
    </p>
    </div>
    <div v-else>

        
        <!-- title -->
    <p class = "text-lg">{{ data.get('title') }}:</p>

    <!-- input -->
    <div v-if = "data.get('input')">
        <p class="text-md font-mono text-gray-600"> {{ data.get('input') }}</p>
        <hr style = "border-color: black;">
    </div>

    <!-- content -->
    <div class="has-math" :id = "data.get('title')+data.get('card')">
    <span v-html="output_html_to_div">
    </span>
    </div>

    <!-- error -->
    <div class = "font-mono text-sm bg-slate-100 p-2 my-3 text-gray-700" v-if = "data.has('error')">
        {{ data.get('error') }}
    </div>
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
        }else if(this.data.get('title') !== "Plot"){
            this.$emit('eval-card', {from: this.data.get('title'), card: this.data.get('card'), var:this.data.get('var')})
        }
        window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById(this.data.get('title')+this.data.get('card'))]);
    },
    computed: {
        output_html_to_div(){
            let output = ""
            if(this.data.get('title') === "Plot"){
                output = `<hr style = "border-color: black;"><p class="text-md pt-3 font-mono text-black text-center">Not Implemented</p>`
            }else if(this.data.has('output')){
                output = this.data.get('output')
            }else if(this.evaluated_result[this.data.get('title')] && this.data.get('input')){
                let result = this.evaluated_result[this.data.get('title')]
                if(result.length > 0){
                    output =  "<script type=\"math/tex; mode=display\">" + result + "<\/script>"
                }else{
                    output = `<p class="text-md pt-3 font-mono text-black text-center">No Result</p>`
                }
            }else if(this.evaluated_result[this.data.get('title')] && !this.data.get('input')){
                output = this.evaluated_result[this.data.get('title')]
            }else{
                if(!this.data.get('input')){
                    output+=`<hr style = "border-color: black;">`
                }
                output += `<div class = "text-center" >Processing...</div>`
            }
            setTimeout(() => {window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById(this.data.get('title')+this.data.get('card'))])}, 10)
            return output
        }
    }
}
</script>

<style>
table, th, td {
    margin-top: 10px;
    margin-left: auto;
    margin-right:auto;
    padding-inline: 10px;
    border: 1px solid;
}

</style>