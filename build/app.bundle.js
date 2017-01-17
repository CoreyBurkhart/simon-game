/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Model = __webpack_require__(1);

	var _Model2 = _interopRequireDefault(_Model);

	var _View = __webpack_require__(2);

	var _View2 = _interopRequireDefault(_View);

	var _Controller = __webpack_require__(3);

	var _Controller2 = _interopRequireDefault(_Controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var M = new _Model2.default();
	var V = new _View2.default();
	var C = new _Controller2.default(M, V);

	window.addEventListener('load', function loading() {
	  C.bindListeners();
	  window.removeEventListener('load', loading);
	});

	window.addEventListener('unload', function unloading() {
	  C.removeListeners();
	  document.removeEventListener('unload', unloading);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	  function Model() {
	    _classCallCheck(this, Model);

	    this.sequence = [];
	    this.userSequence = [];
	    this.started = false;
	    this.turn = 'AI';
	    this.strict = false;
	    this.speed = 500; //in miliseconds
	  }

	  _createClass(Model, [{
	    key: 'next',
	    value: function next() {
	      this.turn = 'AI';
	      var r = Math.floor(Math.random() * 4);
	      this.sequence.push(r);
	    }
	  }, {
	    key: 'resetButton',
	    value: function resetButton() {
	      this.sequence = [];
	      this.userSequence = [];
	      this.started = false;
	      this.turn = 'AI';
	    }
	  }, {
	    key: 'strictReset',
	    value: function strictReset() {
	      this.sequence = [];
	      this.userSequence = [];
	      this.turn = 'AI';
	    }
	  }]);

	  return Model;
	}();

	exports.default = Model;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = function () {
	  function View() {
	    _classCallCheck(this, View);

	    // this.Model = Model;
	    this.paths = getPaths(); // buttons
	    this.counter = document.getElementById('counter-display');
	    this.startButton = document.getElementById('start-stop');
	    this.cancel = false;
	  }

	  _createClass(View, [{
	    key: 'flipStartButtonText',
	    value: function flipStartButtonText() {
	      var t = this.startButton.value;
	      switch (t) {
	        case 'start':
	        case 'START':
	          t = 'stop';
	          break;
	        case 'stop':
	        case 'STOP':
	          t = 'start';
	          break;
	      }
	      this.startButton.value = t;
	    }
	    //plays lights button and triggers sound

	  }, {
	    key: 'play',
	    value: function play(arr, delay, index) {
	      var _this = this;

	      //if there is an array supplied, iterate through the array otherwise treat it like a single action
	      var actions = void 0;
	      //func that actually does the animation
	      var action = function action(num, delay) {
	        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (num + 1) + '.mp3');
	        audio.play();
	        _this.paths[num].classList.toggle('button-active');
	        return window.setTimeout(function () {
	          _this.paths[num].classList.toggle('button-active');
	        }, delay);
	      };
	      if (arr) {
	        // make an array of promises that resolve when it's timer runs out
	        //if this.cancel is true at timeout, it will reject.
	        actions = arr.map(function (ele, i) {
	          return new Promise(function (resolve, reject) {
	            window.setTimeout(function (res, rej) {
	              if (_this.cancel) {
	                rej('REJECTED');
	              } else {
	                res('RESOLVED'); //resolve
	              }
	            }, delay * (i + 1) * 1.5, resolve, reject);
	          }).then(function (success) {
	            action(ele, delay);
	          }, function (error) {
	            console.info('sequence cancelled');
	          });
	        });
	      } else {
	        action(index, delay);
	      }
	      return actions;
	    }
	  }, {
	    key: 'changeCounter',
	    value: function changeCounter(str) {
	      switch (str) {
	        case 'INCREMENT':
	          var n = Number(this.counter.innerText);
	          n += 1;
	          n = n.toString();
	          this.counter.innerText = n;
	          break;
	        default:
	          this.counter.innerText = '0';
	      }
	    }
	  }, {
	    key: 'failAlert',
	    value: function failAlert(delay) {
	      var _this2 = this;

	      this.counter.classList.toggle('active');
	      window.setTimeout(function () {
	        _this2.counter.classList.toggle('active');
	      }, delay);
	    }
	  }]);

	  return View;
	}();

	exports.default = View;


	function getPaths() {
	  var svgArr = Array.from(document.getElementsByTagName('svg'));
	  svgArr = svgArr.map(function (ele) {
	    return ele.children[0];
	  });
	  return svgArr;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Contoller = function () {
	  function Contoller(Model, View) {
	    _classCallCheck(this, Contoller);

	    this.Model = Model;
	    this.View = View;
	    this.toggleEle = document.getElementById('start-stop');
	    this.speedEle = document.getElementById('speed');
	    this.resetEle = document.getElementById('reset');
	    this.strictEle = document.getElementById('strict-toggle');
	    this.buttons = Array.from(document.getElementsByTagName('svg'));
	  }

	  _createClass(Contoller, [{
	    key: 'bindListeners',
	    value: function bindListeners() {
	      var _this = this;

	      this.buttons.forEach(function (ele) {
	        var path = ele.children[0];
	        path.addEventListener('click', _this.gameButtonHandler.bind(_this));
	      });
	      this.toggleEle.addEventListener('click', this.toggleStart.bind(this));
	      this.speedEle.addEventListener('change', this.setSpeed.bind(this));
	      this.resetEle.addEventListener('click', this.reset.bind(this));
	      this.strictEle.addEventListener('change', this.setStrict.bind(this));
	    }
	  }, {
	    key: 'removeListeners',
	    value: function removeListeners() {
	      var _this2 = this;

	      this.buttons.forEach(function (ele) {
	        var path = ele.children[0];
	        path.removeEventListener('click', _this2.gameButtonHandler);
	      });
	      this.toggleEle.removeEventListener('click', this.toggleStart);
	      this.speedEle.removeEventListener('change', this.setSpeed);
	      this.resetEle.removeEventListener('click', this.reset);
	      this.strictEle.removeEventListener('change', this.setStrict);
	    }
	  }, {
	    key: 'gameButtonHandler',
	    value: function gameButtonHandler(e) {
	      //check if it's the players turn
	      if (this.Model.turn === 'PLAYER' && this.Model.started) {
	        var speed = this.Model.speed;
	        var index = Number(e.target.id[6]); //get number from end of ID on path element
	        this.View.play(null, speed, index);
	        this.Model.userSequence.push(index);
	        this.checkUserSequence();
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset(str) {
	      var _this3 = this;

	      var delay = this.Model.speed * 2;
	      switch (str) {
	        case 'STRICT FAIL':
	          window.setTimeout(function () {
	            _this3.View.changeCounter(); //resets counter
	            _this3.View.failAlert(delay);
	            _this3.Model.strictReset();
	            _this3.nextSequence();
	          }, delay);
	          break;
	        case 'NONSTRICT FAIL':
	          window.setTimeout(function () {
	            _this3.View.failAlert(delay);
	            _this3.Model.userSequence = [];
	            _this3.playSequence();
	          }, delay);
	          break;
	        default:
	          //reset button hit
	          if (this.Model.started) {
	            this.toggleStart();
	          }
	          this.Model.resetButton();
	          this.View.changeCounter();
	      }
	    }
	  }, {
	    key: 'nextSequence',
	    value: function nextSequence() {
	      var _this4 = this;

	      window.setTimeout(function () {
	        _this4.Model.userSequence = [];
	        _this4.Model.next();
	        _this4.View.changeCounter('INCREMENT');
	        _this4.playSequence();
	      }, this.Model.speed * 2);
	    }
	  }, {
	    key: 'checkUserSequence',
	    value: function checkUserSequence() {
	      //get copies of arrays of buttons
	      var usrArr = [].concat(_toConsumableArray(this.Model.userSequence));
	      var seqArr = [].concat(_toConsumableArray(this.Model.sequence));
	      var num1 = seqArr[usrArr.length - 1];
	      var num2 = [].concat(_toConsumableArray(usrArr)).pop();

	      //compare the user and original sequence
	      if (num1 !== num2) {
	        if (this.Model.strict) {
	          this.reset('STRICT FAIL');
	        } else {
	          this.reset('NONSTRICT FAIL');
	        }
	      } else if (num1 === num2 && usrArr.length === seqArr.length) {
	        //user got the whole thing right
	        this.nextSequence();
	      }
	    }
	  }, {
	    key: 'setStrict',
	    value: function setStrict(e) {
	      this.Model.strict = !this.Model.strict;
	      console.info('Strict: ', this.Model.strict);
	    }
	  }, {
	    key: 'setSpeed',
	    value: function setSpeed(e) {
	      var val = e.target.value;
	      var speed = (2200 - val * 600) / 2;
	      this.Model.speed = speed;
	    }
	  }, {
	    key: 'playSequence',
	    value: function playSequence() {
	      var _this5 = this;

	      this.timers = this.View.play([].concat(_toConsumableArray(this.Model.sequence)), this.Model.speed);
	      //set the turn to player after the sequence is done playing
	      Promise.all(this.timers).then(function () {
	        _this5.Model.turn = 'PLAYER';
	        delete _this5.timers;
	      });
	    }
	  }, {
	    key: 'toggleStart',
	    value: function toggleStart(e) {
	      this.View.cancel = false;
	      if (!this.Model.started) {
	        //kick off sequence or continue sequence
	        if (!this.Model.sequence.length) {
	          this.nextSequence();
	        } else {
	          this.playSequence();
	        }
	      } else {
	        this.View.cancel = true;
	      }
	      this.Model.started = !this.Model.started;
	      this.View.flipStartButtonText();
	    }
	  }]);

	  return Contoller;
	}();

	exports.default = Contoller;

/***/ }
/******/ ]);