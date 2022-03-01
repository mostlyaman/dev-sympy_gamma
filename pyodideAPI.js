//Source: https://pyodide.org/en/stable/usage/webworker.html#the-worker-api
const baseURL = import.meta.env.BASE_URL

const pyodideWorker = new Worker(`${baseURL}worker.js`);

pyodideWorker.postMessage({name: 'baseURL', data: baseURL})

const callbacks = {};

pyodideWorker.onmessage = (event) => {
  if(event.data.name === "loading-pyodide"){
    document.dispatchEvent(new CustomEvent('loading-pyodide'))
  }else if(event.data.name === "loading-packages"){
    document.dispatchEvent(new CustomEvent('loading-packages', {detail: {data: event.data.data}}))
  }else if(event.data.name === "starting-python"){
    document.dispatchEvent(new CustomEvent('starting-python'))
  }else if(event.data.name === "done-loading"){
    document.dispatchEvent(new CustomEvent('done-loading', {detail: {data: event.data.data}}))
  }else if(event.data.name === "loading-sympy"){
    document.dispatchEvent(new CustomEvent('loading-sympy'))
  }else if(event.data.name === "loading-python-failed"){
    document.dispatchEvent(new CustomEvent('loading-python-failed', {detail: {error: event.data.error}}))
  }
  else if(event.data.name === "output"){
    const { id, ...data } = event.data.data;
    const onSuccess = callbacks[id];
    delete callbacks[id];
    onSuccess(data);
  }
};

const asyncRun = (() => {
  let id = 0; // identify a Promise
  return (script, type, context) => {
    // the id could be generated more carefully
    id = (id + 1) % Number.MAX_SAFE_INTEGER;
    return new Promise((onSuccess) => {
      callbacks[id] = onSuccess;
      pyodideWorker.postMessage({name: type, 
      data: {
        ...context,
        python: script,
        id,
      }});
    });
  };
})();
export default asyncRun ;