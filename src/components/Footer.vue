<template>
    <div class = "text-xs my-9 grid place-items-center">
        <p class = "my-3">SymPy Gamma version 43. SymPy version {{ sympy_version }}. Pyodide version {{ pyodide_version }}</p>
        <p>&copy 2013-2022 SymPy Development Team. This project is Open Source: <a href="https://github.com/mostlyaman/dev-sympy_gamma/" target = "_blank" class ="underline text-blue-600 hover:text-blue-800" >SymPy Gamma on Github.</a></p>
    </div>
</template>

<script setup>
const props = defineProps({
  sympy_version: String,
  pyodide_version: String
})
</script>