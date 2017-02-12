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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parent = _ref.parent,
        canvas = _ref.canvas,
        map = _ref.map,
        raycastCanvas = _ref.raycastCanvas;

    _classCallCheck(this, Camera);

    this.parent = parent;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.raycastCanvas = raycastCanvas;
    this.raycastContext = this.raycastCanvas.getContext('2d');
  }

  _createClass(Camera, [{
    key: 'update',
    value: function update() {
      this.x = this.parent.x;
      this.y = this.parent.y;
      this.rotation = this.parent.rotation;
    }
  }]);

  return Camera;
}();

exports.default = Camera;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 3, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 3, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

exports.default = map1;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$map = _ref.map,
        map = _ref$map === undefined ? [[0]] : _ref$map,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$rotation = _ref.rotation,
        rotation = _ref$rotation === undefined ? 0 : _ref$rotation;

    _classCallCheck(this, Player);

    this.map = map;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.direction = 0;
    this.moveSpeed = 5;
    this.rotationSpeed = 180; // Half rotation per second
    this.rotation = rotation;
    this.bindKeys();
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      this.rotation += this.direction * this.rotationSpeed * window.deltaTime;
      var moveStep = this.speed * this.moveSpeed;
      var radians = this.rotation * Math.PI / 180;

      var moveX = Math.cos(radians) * moveStep;
      var moveY = Math.sin(radians) * moveStep;

      var newX = this.x + moveX * window.deltaTime;
      var newY = this.y + moveY * window.deltaTime;

      if (!this.hitTest(newX, newY)) {
        this.x = newX;
        this.y = newY;
      }
    }
  }, {
    key: "hitTest",
    value: function hitTest(x, y) {
      return this.map.data[Math.floor(y)][Math.floor(x)] > 0;
    }
  }, {
    key: "bindKeys",
    value: function bindKeys() {
      var _this = this;

      document.onkeydown = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        switch (key) {
          case 38:
            _this.speed = 1;
            break;
          case 40:
            _this.speed = -1;
            break;
          case 37:
            _this.direction = -1;
            break;
          case 39:
            _this.direction = 1;
            break;
        }
      };

      document.onkeyup = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        switch (key) {
          case 38:
            _this.speed = 0;
            break;
          case 40:
            _this.speed = 0;
            break;
          case 37:
            _this.direction = 0;
            break;
          case 39:
            _this.direction = 0;
            break;
        }
      };
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(1);

var _map2 = _interopRequireDefault(_map);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _camera = __webpack_require__(0);

var _camera2 = _interopRequireDefault(_camera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RaycastEngine = function () {
  function RaycastEngine(elementId) {
    _classCallCheck(this, RaycastEngine);

    this.canvas = document.getElementById(elementId);
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.map = {
      data: _map2.default,
      width: _map2.default[0].length,
      height: _map2.default.length
    };
    this.player = new _player2.default({
      map: this.map,
      x: 10,
      y: 10,
      rotation: 20
    });
    // Raycast Canvas
    this.raycastCanvas = document.createElement('canvas');
    this.raycastContext = this.raycastCanvas.getContext('2d');
    this.camera = new _camera2.default({ parent: this.player, canvas: this.canvas, map: this.map, raycastCanvas: this.raycastCanvas });
    window.deltaTime = 0;
    window.lastUpdate = Date.now();
    document.body.appendChild(this.raycastCanvas);

    this.gameLoop();
  }

  _createClass(RaycastEngine, [{
    key: 'update',
    value: function update() {
      this.player.update();
      this.drawRaycastCanvas();
      this.camera.update();
    }
  }, {
    key: 'drawRaycastCanvas',
    value: function drawRaycastCanvas() {
      var scale = 20;
      this.raycastCanvas.width = this.map.width * scale;
      this.raycastCanvas.height = this.map.height * scale;
      this.raycastContext.clearRect(0, 0, this.map.width * scale, this.map.height * scale);

      for (var y in this.map.data) {
        for (var x in this.map.data[y]) {
          if (this.map.data[y][x] > 0) {
            this.raycastContext.fillStyle = '#ccc';
            this.raycastContext.fillRect(x * scale, y * scale, scale, scale);
          } else {
            this.raycastContext.strokeStyle = '#ccc';
            this.raycastContext.strokeRect(x * scale, y * scale, scale, scale);
          }
        }
      }

      var radians = this.player.rotation * Math.PI / 180;

      this.raycastContext.save();
      this.raycastContext.translate(this.player.x * scale, this.player.y * scale);
      this.raycastContext.rotate(radians);
      this.raycastContext.fillStyle = '#000';
      this.raycastContext.fillRect(-scale / 4, -scale / 4, scale / 2, scale / 2);
      this.raycastContext.restore();
    }
  }, {
    key: 'gameLoop',
    value: function gameLoop() {
      var _this = this;

      var currentFrameTime = Date.now();
      window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
      window.lastUpdate = currentFrameTime;
      this.update();

      window.requestAnimationFrame(function () {
        return _this.gameLoop();
      });
    }
  }]);

  return RaycastEngine;
}();

window.RaycastEngine = RaycastEngine;

/***/ })
/******/ ]);