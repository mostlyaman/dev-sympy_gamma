<template>
    <div class = "bg-[#3b5526] h-40">
        <router-link :to = "{ name: 'Main' }">
        <div class="flex justify-center py-4">
                <img src="/sympy-logo.png" class = "h-12 w-16" alt="Sympy Logo">
                <h1 class = "m-2 text-slate-200 sympy text-3xl hover:text-lime-400 cursor-pointer">SymPy Gamma</h1>
        </div>
        </router-link>
        <form @submit = "(e) =>{e.preventDefault(); $emit('expr-input', input_expr)}">
        <div class = "flex justify-center p-2">
            <input type="text" class="form-input py-1 w-[100vh]" v-model = "input_expr">
            <button type = "submit" class = "bg-lime-600 px-5 text-white hover:bg-lime-700">=</button>
        </div>
        </form>
    </div>
</template>

<script setup>
let input_expr = ""
const emit = defineEmits(['expr-input'])
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Vollkorn&display=swap');
.sympy {
    font-family: Vollkorn;
}

</style>