let timer;

self.onmessage = (event) => {
    if (event.data === 'start' || event.data === 'stop') {
        clearInterval(timer)
    }
    if (event.data === 'start') {
        timer = setInterval(() => {
          self.postMessage('tick')
        }, 1000);
    }
}
