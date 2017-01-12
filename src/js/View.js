export default class View {
  constructor() {
    // this.Model = Model;
    this.paths =  getPaths() // buttons
    this.counter =  document.getElementById('counter-display');
    this.startButton = document.getElementById('start-stop');
    this.cancel = false;
  }
  flipStartButtonText() {
    let t = this.startButton.value;
    switch(t) {
      case 'start':
      case 'START':
        t = 'stop'
        break;
      case 'stop':
      case 'STOP':
        t = 'start'
        break;
    }
    this.startButton.value = t;
  }
  //plays lights button and triggers sound
  play(arr, delay, index) {
    //if there is an array supplied, iterate through the array otherwise treat it like a single action
    let actions;
    //func that actually does the animation
    let action = (num, delay) => {
      let audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${num + 1}.mp3`);
      audio.play()
      this.paths[num].classList.toggle('button-active')
      return window.setTimeout(() => {
        this.paths[num].classList.toggle('button-active')
      }, delay);
    }
    if(arr) {
      // make an array of promises that resolve when it's timer runs out
      //if this.cancel is true at timeout, it will reject.
      actions = arr.map((ele, i) => {
        return new Promise((resolve, reject) => {
          window.setTimeout((res, rej) => {
            if(this.cancel) {
              rej('REJECTED')
            } else {
              res('RESOLVED') //resolve
            }
          }, delay * (i + 1) * 1.5, resolve, reject)
        })
        .then(
          (success) => {action(ele, delay)},
          (error) => {console.info('sequence cancelled')}
        );
      })
    }
    else {
      action(index, delay);
    }
    return actions;
  }
  changeCounter(str) {
    switch (str) {
      case 'INCREMENT':
        let n = Number(this.counter.innerText)
        n += 1;
        n = n.toString()
        this.counter.innerText = n;
        break;
      default:
        this.counter.innerText = '0';
    }
  }
  failAlert(delay) {
    this.counter.classList.toggle('active');
    window.setTimeout(() => {this.counter.classList.toggle('active')}, delay);
  }
}

function getPaths() {
  let svgArr = Array.from(document.getElementsByTagName('svg'))
  svgArr = svgArr.map((ele) => {
    return ele.children[0];
  })
  return svgArr;
}
