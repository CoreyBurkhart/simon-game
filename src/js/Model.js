export default class Model {
  constructor() {
    this.sequence = [];
    this.userSequence = [];
    this.started = false;
    this.turn = 'AI';
    this.strict = false;
    this.speed = 500; //in miliseconds
  }
  next() {
    this.turn = 'AI';
    let r = Math.floor(Math.random() * 4);
    this.sequence.push(r);
  }
  resetButton() {
    this.sequence = [];
    this.userSequence = [];
    this.started = false;
    this.turn = 'AI';
  }
  strictReset() {
    this.sequence = [];
    this.userSequence = [];
    this.turn = 'AI';
  }
}
