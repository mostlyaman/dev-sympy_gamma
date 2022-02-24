window.MathJax = {
    tex: {
      inlineMath: [['$', '$']]
    },
  };
  
async function loadMathjax() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    document.head.appendChild(script);
};

loadMathjax()
.then(()=> {
    console.log('MathJax Loaded!')
}).catch((e) => {
    console.log(e)
})
