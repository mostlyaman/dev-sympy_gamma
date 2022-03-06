// Source: https://pyodide.org/en/stable/usage/webworker.html



const pyodideVersion = "0.19.0"
let baseURL = "/"



importScripts(`https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/pyodide.js`);
async function loadPyodideAndPackages() {
  postMessage({name: 'loading-pyodide'})
  self.pyodide = await loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
  });
  postMessage({name: 'loading-packages', data: pyodideVersion})
  await self.pyodide.loadPackage(["numpy", "sympy", "micropip", "docutils", 'six']);
  postMessage({name: "starting-python"})
  try{

    await self.pyodide.runPythonAsync(`
import micropip
from pyodide import to_js
await micropip.install('${baseURL}gammaLogic-1.0-py3-none-any.whl')
print("Installed Packages:\\n", micropip.list())
from gammaLogic.logic import SymPyGamma
s = SymPyGamma()
`)
  }catch(error){
    console.error(error.message)
    postMessage({name: 'loading-python-failed', error: error.message})
  }
  postMessage({name: 'loading-sympy'})
  let sympy_version = await self.pyodide.runPythonAsync(`
import sympy
from sympy import *
x, y, z, n, k = symbols('x y z n k')
to_js(sympy.__version__)
`)
  postMessage({name: 'done-loading', data: sympy_version})
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  if(event.data.name === "baseURL"){
    baseURL = event.data.data
  }else{
    // make sure loading is done
    await pyodideReadyPromise;
    // Don't bother yet with this line, suppose our API is built in such a way:
    const { id, python, ...context } = event.data.data;
    // The worker copies the context in its own "memory" (an object mapping name to values)
    for (const key of Object.keys(context)) {
      self[key] = context[key];
    }
    // Now is the easy part, the one that is similar to working in the main thread:
    try {
      if(event.data.name === "input"){
        var results = await self.pyodide.runPythonAsync(`to_js(s.eval("`+python+`"))`);
      }else if(event.data.name === "eval"){
        var results = await self.pyodide.runPythonAsync(`
  def _func():
    _result = `+python+`
    if isinstance(_result, (list, tuple)):
      return to_js(list(map(latex, _result)))
    else:
      return to_js(latex(_result))
  _func()`)
      }else if(event.data.name === "eval-card"){
        var results = await self.pyodide.runPythonAsync(`
  print('${python}')
  def _func():
    return to_js(s.eval_card(${python}))
  _func()`)
      }
      postMessage({name: "output", data: { results, id }});
    } catch (error) {

      postMessage({name: "output", data: { error: error.message, id }});
    }
  }
};
