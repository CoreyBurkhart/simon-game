import Model from "./Model.js";
import View from "./View.js";
import Controller from "./Controller.js";

let M = new Model();
let V = new View();
let C = new Controller(M, V);

window.addEventListener('load', function loading() {
  C.bindListeners()
  window.removeEventListener('load', loading);
});

window.addEventListener('unload', function unloading() {
  C.removeListeners()
  document.removeEventListener('unload', unloading);
});
