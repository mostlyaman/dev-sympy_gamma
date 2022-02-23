<script setup>
import { ref } from 'vue'
import Searchbar from './components/Searchbar.vue'
import Footer from './components/Footer.vue';
import Output from './views/Output.vue'
import asyncRun from '/public/pyodideAPI'

let isloading = ref("Loading")
let sympy_version = ref("Loading...")
document.addEventListener('loading-pyodide', ()=>{isloading.value = "Loading Pyodide"})
document.addEventListener('loading-packages', ()=>{isloading.value = "Loading Packages"})
document.addEventListener('starting-python', ()=>{isloading.value = "Starting Python"})
document.addEventListener('loading-sympy', ()=> {isloading.value = "Loading SymPy"})
document.addEventListener('done-loading', (e)=>{isloading.value = "Finished Loading"; sympy_version.value = e.detail.data;})
document.addEventListener('loading-python-failed', (e)=> {isloading.value = "Error: " + e.detail.error })

</script>

<script>
export default{
  data(){
    return {
      parseInput: []
    }
  },
  watch: {
    '$route' (to){
      if(to.name === "Output"){
        this.parseInput = []
        this.handle_input(this.$route.params.expr)
      }
    }
  },
  methods: {
    async main(script, context = {}) {
      try{
          const { results, error } = await asyncRun(script, context);
          if (results) {
              return results;
          } else if (error) {
              console.log(error)
              alert("pyodideWorker error: " + error + ". Please report an issue on github.");
          }
      }catch (e){
          console.log(
          `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
          );
          alert(`asyncRun Failed. Please report an issue on github. Details: Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`)
      }
    },
    handle_input(input_expr){
      this.main(input_expr).then((data) => {
        this.parseInput = data
      }).catch((error) =>{
        console.log(error)
        alert('Promise returned Error. Please report an issue on github.' + error)
      })
    }
  }
}
</script>

<template>
  <div>


    <header class="bg-[#032200] text-slate-300 border-b-2 border-lime-500 ">
      <div class="mr-5 px-2 header-links">
        <router-link :to = "{ name: 'Main'}" class = "mr-2 cursor-pointer">Main</router-link>
        <router-link :to = "{ name: 'About'}" class = "mx-2 cursor-pointer">About</router-link>
        <a href="https://live.sympy.org/" target = "_blank" class = "mx-2 cursor-pointer">SymPy Live</a>
      </div>
    </header>


      <main>
        <!--SymPy Logo + SearchBar-->
        <div v-if = "$route.path != '/about'">
          <Searchbar @expr-input= "(input_expr) => {this.$router.push(`/input/${input_expr}`)}" />
        </div>


        <div v-if = "! $route.path.startsWith('/input')" >
          <router-view :isloaded = "isloading"/>
        </div>
        <div v-else>
          <div v-if = "parseInput.length === 0">
            <p class = "text-center text-lg m-4">
              Loading...
            </p> 
          </div>
          <div v-else>
            <div v-for = "card, index in parseInput" :key = "index" >
              <Output :data = "card" />
            </div>
          </div>
        </div>
      </main>



      <footer>
        <Footer :sympy_version="sympy_version"></Footer>
      </footer>
    </div>
</template>

<style>
body {
  background-color: #EEEEEE;
}
</style>