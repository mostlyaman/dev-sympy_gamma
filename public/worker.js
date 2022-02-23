// Source: https://pyodide.org/en/stable/usage/webworker.html



const pyodideVersion = "0.19.0"
let baseURL = "/"



importScripts(`https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/pyodide.js`);
async function loadPyodideAndPackages() {
  postMessage({name: 'loading-pyodide'})
  self.pyodide = await loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
  });
  postMessage({name: 'loading-packages'})
  await self.pyodide.loadPackage(["numpy", "sympy", "micropip", "docutils"]);
  postMessage({name: "starting-python"})
  try{

    await self.pyodide.runPythonAsync(`
import micropip
from pyodide import to_js
await micropip.install('${baseURL}gamma-1.0.0-py3-none-any.whl')
print("Installed Packages:\\n", micropip.list())
from gamma.logic import SymPyGamma
s = SymPyGamma()
`)
  }catch(error){
    console.error(error.message)
    postMessage({name: 'loading-python-failed', error: error.message})
  }
  postMessage({name: 'loading-sympy'})
  let sympy_version = await self.pyodide.runPythonAsync(`
import sympy
def get_sympy_version():
  return to_js(sympy.__version__)
get_sympy_version()
`)
  postMessage({name: 'done-loading', data: sympy_version})
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  if(event.data.name === "baseURL"){
    baseURL = event.data.data
  }else if(event.data.name === "input"){
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
      let results = await self.pyodide.runPythonAsync(`
  def x():
      return to_js(s.eval("`+python+`"))
  x()`);
      self.postMessage({name: "output", data: { results, id }});
    } catch (error) {
      self.postMessage({name: "output", data: { error: error.message, id }});
    }
  }
};
