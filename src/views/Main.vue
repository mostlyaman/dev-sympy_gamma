<script setup>

const props = defineProps({
  isloaded: String
})

const menu = {
  Arithmetic: {
    Fractions: [
      "242/33",
      "0.[123]"
    ],
    Approximations: [
      "pi",
      "E",
      "exp(pi)"
    ]
  },
  Algebra: {
    Expressions: [
      "x",
      "(x+2) / ((x+3)*(x-4))",
      "simplify((x**2-4)/((x+3)*(x-2)))",
    ],
    Polynomials: [
      'div(x**2-4+x, x-2)',
      'gcd(2*x**2 + 6*x, 12*x)',
      "lcm(2*x**2+ 6*x, 12*x)",
      "factor(x**4/2 + 5*x**3/12 - x**2/3)",
      "factor(x**2 + 4*x*y + 4*y**2)",
      "solve(x**2 + 4*x*y + 4*y**2)",
      "solve(x**2 + 4*x*y + 4*y**2, y)",
      "solve(x**2 + 4*x + 181, x)",
      "solve(x**3 + 4*x + 181, x)",
      "solve_poly_system([y**2 - x**3 + 1, y*x], x, y)"
    ]
  },
  Trigonometry: {
    Functions: [
      "sin(2*x)",
      "tan(1+x)"
    ]
  },
  Calculus: {
    Limits: [
      "limit(tan(x), x, pi/2)",
      "limit(tan(x), x, pi/2, dir='-')"
    ],
    Derivatives: [
      "diff(f(x)*g(x)*h(x))",
      "diff(f(x)/g(x))",
      "diff((sin(x) * x^2) / (1 + tan(cot(x))))",
      "diff(cot(xy), y)",
      "diff(y(x)^2 - 5*sin(x), x)",
      "integrate(tan(x))",
      "integrate(2*x + y, y)",
      "integrate(2*x + y, (x, 1, 3))",
      "integrate(2*x + y, (x, 1, 3), (y, 2, 4))",
      "integrate(tan(x), (x, 0, pi/2))",
      "integrate(1/(x**2 + 1), (x, 0, oo))",
      "integrate(exp(x) / (1 + exp(2*x)))",
      "integrate(1 /((x+1)*(x+3)*(x+5)))",
      "integrate((2*x+3)**7)"
    ],
    Series: [
      "series(sin(x), x, pi/2)"
    ]
  }
}
</script>

<template>
  <div class = "text-center m-7 text-lg">
    
    <div v-if="isloaded.startsWith('Error:')">
      {{ isloaded }}
      <p class="p-3">
        <a href="https://github.com/mostlyaman/scuffed-sympy-gamma/issues" class = "underline text-blue-600 hover:text-blue-800" target = "_blank">
          Report this issue here.
        </a>
      </p>
    </div>

    <div v-else-if = "(isloaded!=='Finished Loading')" >
      {{ isloaded }}
    </div>

    <div v-else class = "text-left">
      <div v-for = "(value, key, index) in menu" :key = "index" class = "bg-white shadow-lg m-3 p-7 max-w-[50%] mx-auto">
        <p class = "text-xl font-bold">{{ key }}</p>
        <div v-for = "(value2, key2, index2) in value" :key = "index2">
          <p class="text-lg mt-3 mb-2 font-md">{{ key2 }}</p>
          <div v-for = "(expr, index) in value2" :key = "index">
            <button @click = "()=>{$router.push(`/input/${expr.replace(/\//g, 'divide')}`)}">{{ expr }}</button>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
