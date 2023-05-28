let timer;

self.onmessage = (event) => {
    console.log(event.data)
    if (event.data === 'start' || event.data === 'stop') {
        clearInterval(timer)
    }
    if (event.data === 'start') {
        timer = setInterval(() => {
          self.postMessage('tick')
        }, 1000);
    }
}
