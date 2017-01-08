class Simon {
  constructor() {
    this.sequence = [];
    this.userSequence = [];
    this.started = false;
    this.playerTurn = false;
    this.strict = false;
    this.speed = 600; //in miliseconds
    this.elements = {
      buttons: Array.from(document.getElementsByTagName('svg')),
      buttonDiv: document.getElementById('game-button-container'),
      audio: document.getElementsByTagName('audio'),
      startStop: document.getElementById('start-stop'),
      speed: document.getElementById('speed'),
      reset: document.getElementById('reset'),
      count: document.getElementById('counter-display'),
      strict: document.getElementById('strict-toggle')
    }
    this.bindListeners()
  }

  bindListeners() {
    // bind click listeners on buttons
    this.elements.buttons.forEach((ele) => {
      ele.children[0].o2nclick = this.recordSequence.bind(this)
      ele.children[0].addEventListener('click', this.buttonEffects.bind(this))
    })
    this.elements.startStop.onclick = this.startStop.bind(this)
    this.elements.speed.onchange = this.setSpeed.bind(this)
    this.elements.reset.onclick = this.reset.bind(this)
    this.elements.strict.onchange = this.setStrict.bind(this)
    console.log('boundListeners');
  }

  startStop(e) {
    if(!this.started) {
      this.started = true;
      this.addToSequence()
      this.playSequence();
    } else {
      this.started = false;
    }
    console.log('start/stop');
  }

  reset(e) {
    this.sequence = [];
    this.userSequence = [];
    this.started = false;
    this.strict = false;
    this.elements.strict.children[0].checked = true;
    //stops all actions
    this.changeCounter('RESET');
    console.log('reset');
  }

  setSpeed(e) {
    let val = e.target.value;
    let speed = 2000 - (val * 600);
    this.speed = speed;
    // listen for speed changes and set this.speed. used for timeout
    console.log('setSpeed ', this.speed);
  }

  setStrict(e) {
    this.strict = !this.strict;
    console.log('setStrict ', this.strict);
  }

  changeCounter(action) {
    //called by check user sequence
    switch (action) {
      case 'RESET':
        this.elements.count.innerText = '0';
        break;
      case 'INCREMENT':
        let n = Number(this.elements.count.innerText);
        n++;
        this.elements.count.innerText = n.toString();
        break;
      default:
        throw `could not change counter. Function called with ${action}. valid actions are RESET or 'INCREMENT'`;
    }
  }

  buttonEffects(e) {
    if(this.playerTurn) {
      const index = Number(e.target.id[6]) // id="button0" --> 0
      this.elements.buttons[index].children[0].classList.toggle('button-active')
      window.setTimeout(() => {
        this.elements.buttons[index].children[0].classList.toggle('button-active')
      }, this.speed / 2 )
      this.elements.audio[index].play()
    }
  }

  addToSequence() {
    //pushs new SimonEvent to sequence array with a random button to light
    const index = Math.floor(Math.random() * 4);
    const ele = this.elements.buttons[index];
    const audio = this.elements.audio[index];
    const se = new SimonEvent(ele.children[0], audio, index);
    this.userSequence = [];
    this.changeCounter('INCREMENT');
    this.sequence.push(se)
    console.log(this.sequence);
  }

  playSequence() {
    // go through the sequence the array and play each only if started = true (check each iteration)
    this.sequence.forEach((ele, index) => {
      if(this.started) {
        ele.emit(this.speed * (index + 1) + this.speed, this.speed / 2)
      }
    })
    this.playerTurn = true;
    //if the game get's paused and the boolean started = false while in playback, set this.continue
    // ex. SimonEvent.emit(delay that is multiple of speed and position in sequence)
  }

  recordSequence(e) {
    //if it's the players turn record their inputs
    if(this.playerTurn) {
      this.userSequence.push(Number(e.target.id[6]));
      console.log(this.userSequence);
      this.checkUserSequence();
    }
  }

  failAlert() {
    this.elements.count.classList.toggle('active');
    window.setTimeout(() => {this.elements.count.classList.toggle('active')}, this.speed);
  }

  checkUserSequence() {
    //get copies of arrays of buttons
    let usrArr = [...this.userSequence];
    let seqArr = [...this.sequence].map((ele) => {
      return ele.index
    })

    let index = usrArr.length - 1;
    let compare = {seq: seqArr[index], usr: [...usrArr].pop() }
    //compare the user and original sequence
    if(compare.usr !== compare.seq) {
      //user got it wrong, replay sequence if not in strict
      if(this.strict) {
        this.reset();
        this.failAlert();
        window.setTimeout(() => {
          this.startStop();
        }, 1000);
      } else {
        this.failAlert();
        window.setTimeout(() => {
          this.playerTurn = false;
          this.userSequence = [];
          this.playSequence();
        }, 1000);
      }
    } else if(compare.usr === compare.seq && usrArr.length === seqArr.length) {
      window.setTimeout(() => {
        this.playerTurn = !this.playerTurn
        this.addToSequence();
        this.playSequence();
      }, 1000);
    }
    // if arrays match correct -> true and incrementCount
  }

}











class SimonEvent {
  constructor(element, audio, index) {
    // super()
    this.index = index;
    this.audio = audio;
    this.element = element;
  }

  emit(delay, onTime) {
    // returns a promise?

      //check to see if game was paused, if it was, reject promise, and canel timeout
      //if game not paused of reset, let timout complete and resolve promise
    //lights the specified panel

    let markButton = () => {
      //plays the sound and gives visual feedback
      this.element.classList.toggle('button-active')
      this.audio.play()
      window.setTimeout(() => {
        this.element.classList.toggle('button-active')
      }, onTime)
      console.log('marked button');
    }

    window.setTimeout(markButton, delay)
    console.log('emit');
  }
}

let x = new Simon();
