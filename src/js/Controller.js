export default class Contoller {
  constructor(Model, View) {
    this.Model = Model;
    this.View = View;
    this.toggleEle = document.getElementById('start-stop')
    this.speedEle = document.getElementById('speed')
    this.resetEle = document.getElementById('reset')
    this.strictEle = document.getElementById('strict-toggle')
    this.buttons = Array.from(document.getElementsByTagName('svg'))
  }
  bindListeners() {
    this.buttons.forEach((ele) => {
      let path = ele.children[0];
      path.addEventListener('click', this.gameButtonHandler.bind(this))
    })
    this.toggleEle.addEventListener('click', this.toggleStart.bind(this))
    this.speedEle.addEventListener('change', this.setSpeed.bind(this))
    this.resetEle.addEventListener('click', this.reset.bind(this))
    this.strictEle.addEventListener('change', this.setStrict.bind(this))
  }
  removeListeners() {
    this.buttons.forEach((ele) => {
      let path = ele.children[0];
      path.removeEventListener('click', this.gameButtonHandler)
    })
    this.toggleEle.removeEventListener('click', this.toggleStart)
    this.speedEle.removeEventListener('change', this.setSpeed)
    this.resetEle.removeEventListener('click', this.reset)
    this.strictEle.removeEventListener('change', this.setStrict)
  }
  gameButtonHandler(e) {
    //check if it's the players turn
    if(this.Model.turn === 'PLAYER' && this.Model.started) {
      const speed = this.Model.speed;
      const index = Number(e.target.id[6]) //get number from end of ID on path element
      this.View.play(null, speed, index);
      this.Model.userSequence.push(index);
      this.checkUserSequence();
    }
  }
  reset(str) {
    const delay = this.Model.speed * 2;
    switch(str) {
      case 'STRICT FAIL':
        window.setTimeout(()=> {
          this.View.changeCounter(); //resets counter
          this.View.failAlert(delay);
          this.Model.strictReset();
          this.nextSequence();
        }, delay)
        break;
      case 'NONSTRICT FAIL':
        window.setTimeout(()=> {
          this.View.failAlert(delay);
          this.Model.userSequence = [];
          this.playSequence()
        }, delay)
        break;
      default:
        //reset button hit
        if(this.Model.started) {
          this.toggleStart()
        }
        this.Model.resetButton();
        this.View.changeCounter();
    }
  }
  nextSequence() {
    window.setTimeout(()=> {
      this.Model.userSequence = [];
      this.Model.next();
      this.View.changeCounter('INCREMENT');
      this.playSequence();
    }, this.Model.speed * 2)
  }
  checkUserSequence() {
    //get copies of arrays of buttons
    const usrArr = [...this.Model.userSequence];
    const seqArr = [...this.Model.sequence]
    const num1 = seqArr[usrArr.length - 1];
    const num2 = [...usrArr].pop();

    //compare the user and original sequence
    if(num1 !== num2) {
      if(this.Model.strict) {
        this.reset('STRICT FAIL');
      } else {
        this.reset('NONSTRICT FAIL')
      }
    } else if(num1 === num2 && usrArr.length === seqArr.length) {
      //user got the whole thing right
      this.nextSequence();
    }
  }
  setStrict(e) {
    this.Model.strict = !this.Model.strict;
    console.info('Strict: ', this.Model.strict);
  }
  setSpeed(e) {
    let val = e.target.value;
    let speed = (2200 - (val * 600)) / 2;
    this.Model.speed = speed;
    // listen for speed changes and set this.speed. used for timeout
    console.log('setSpeed ', this.Model.speed);
  }
  playSequence() {
    this.timers = this.View.play([...this.Model.sequence], this.Model.speed)
    //set the turn to player after the sequence is done playing
    Promise.all(this.timers).then(() => {
      console.log('promise.all triggered');
      this.Model.turn = 'PLAYER';
      delete this.timers;
    })
  }
  toggleStart(e) {
    this.View.cancel = false;
    if(!this.Model.started) {
      //kick off sequence or continue sequence
      if(!this.Model.sequence.length) {
        this.nextSequence();
      } else {
        this.playSequence();
      }
    }
    else {
      this.View.cancel = true;
    }
    this.Model.started = !this.Model.started;
    this.View.flipStartButtonText();
  }
}
