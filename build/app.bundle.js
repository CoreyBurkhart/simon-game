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

	C.bindListeners();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	    this.speed = 600; //in miliseconds
	  }

	  _createClass(Model, [{
	    key: 'getSequence',
	    get: function get() {
	      return this.sequence;
	    }
	  }, {
	    key: 'getUserSequence',
	    get: function get() {
	      return this.userSequence;
	    }
	  }, {
	    key: 'getStarted',
	    get: function get() {
	      return this.started;
	    }
	  }, {
	    key: 'getTurn',
	    get: function get() {
	      return this.turn;
	    }
	  }, {
	    key: 'getStrict',
	    get: function get() {
	      return this.strict;
	    }
	  }, {
	    key: 'getSpeed',
	    get: function get() {
	      return this.speed;
	    }
	  }, {
	    key: 'setSequence',
	    set: function set(array) {
	      if (typeof array === 'array') {
	        this.sequence = array;
	        new Event('modelChange');
	      } else {
	        throw 'Cannot set sequence to ' + (typeof array === 'undefined' ? 'undefined' : _typeof(array));
	      }
	    }
	  }, {
	    key: 'setUserSequence',
	    set: function set(array) {
	      if (typeof array === 'array') {
	        this.userSequence = array;
	        new Event('modelChange');
	      } else {
	        throw 'Cannot set userSequence to ' + (typeof array === 'undefined' ? 'undefined' : _typeof(array));
	      }
	    }
	  }, {
	    key: 'setStarted',
	    set: function set(bool) {
	      if (typeof bool === 'boolean') {
	        this.started = bool;
	        new Event('modelChange');
	      } else {
	        throw 'Cannot set boolean started to ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool));
	      }
	    }
	  }, {
	    key: 'setTurn',
	    set: function set(string) {
	      if (typeof string === 'string') {
	        this.turn = turn;
	        new Event('modelChange');
	      } else {
	        throw 'Cannot set string turn to ' + (typeof string === 'undefined' ? 'undefined' : _typeof(string));
	      }
	    }
	  }, {
	    key: 'setStrict',
	    set: function set(bool) {
	      if (typeof bool === 'boolean') {
	        this.strict = bool;
	        new Event('modelChange');
	      } else {
	        throw 'Connot set boolean strict to ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool));
	      }
	    }
	  }, {
	    key: 'setSpeed',
	    set: function set(num) {
	      if (typeof num === 'number') {
	        this.speed = num;
	        new Event('modelChange');
	      } else {
	        throw 'Cannot set number speed to ' + (typeof num === 'undefined' ? 'undefined' : _typeof(num));
	      }
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
	  }

	  //play (lights button and triggers sound)


	  _createClass(View, [{
	    key: 'play',
	    value: function play(index, delay) {
	      var _this = this;

	      //keep it simple for now
	      //make an audio object
	      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (index - 1) + '.mp3');

	      this.paths[index].classList.toggle('button-active');
	      audio.play();
	      window.setTimeout(function () {
	        _this.path[index].classList.toggle('button-active');
	        audio.stop();
	      }, delay);
	    }
	    //reset (resets the control counter w/ or w/o an alert)
	    //changeCounter

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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Contoller = function () {
	  function Contoller(Model, View) {
	    _classCallCheck(this, Contoller);

	    this.Model = Model;
	    this.View = View;
	  }

	  _createClass(Contoller, [{
	    key: 'bindListeners',
	    value: function bindListeners() {
	      var buttons = Array.from(document.getElementsByTagName('svg'));
	      buttons.forEach(function (ele) {
	        var path = ele.children[0];
	        path.addEventListener('click', SOMEMETHOD);
	      });
	      document.getElementById('start-stop').addEventListener('click', SOMEMETHOD);
	      document.getElementById('speed').addEventListener('click', SOMEMETHOD);
	      document.getElementById('reset').addEventListener('click', SOMEMETHOD);
	      document.getElementById('strict-toggle').addEventListener('click', SOMEMETHOD);
	    }
	  }, {
	    key: 'SOMEMETHOD',
	    value: function SOMEMETHOD() {}
	  }, {
	    key: 'toggleStart',
	    value: function toggleStart() {}
	  }]);

	  return Contoller;
	}();

	exports.default = Contoller;

/***/ }
/******/ ]);