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
    this.map = map;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.raycastCanvas = raycastCanvas;
    this.raycastContext = this.raycastCanvas.getContext('2d');
    this.focalLength = this.canvas.height / 2;
    this.columnWidth = 2;
    this.createRays();
  }

  _createClass(Camera, [{
    key: 'update',
    value: function update() {
      this.x = this.parent.x;
      this.y = this.parent.y;
      this.rotation = this.parent.rotation;
      this.createRays();
    }
  }, {
    key: 'createRays',
    value: function createRays() {
      var columns = Math.ceil(this.canvas.width / this.columnWidth);
      // columns = 1;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var columnsToDraw = [];
      var maxWallHeight = this.canvas.height;
      for (var column = 0; column < columns; column++) {
        var x = -columns / 2 + column;
        var angle = Math.atan2(x, this.focalLength);
        var radians = this.parent.rotation * Math.PI / 180;
        var z = this.castRay(radians + angle);
        var height = this.canvas.height / z;
        var columnX = column * this.columnWidth;
        this.context.fillStyle = '#000';
        this.context.fillRect(columnX, this.canvas.height / 2 - height / 2, this.columnWidth, height);
      }
    }
  }, {
    key: 'castRay',
    value: function castRay(angle) {
      var twoPI = Math.PI * 2;
      angle %= twoPI;
      if (angle < 0) angle += twoPI;
      var right = angle > twoPI * 0.75 || angle < twoPI * 0.25;
      var up = angle < 0 || angle > Math.PI;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var slope = sin / cos;

      var x = right ? Math.ceil(this.parent.x) : Math.floor(this.parent.x);
      var y = this.parent.y + (x - this.parent.x) * slope;

      var xOffset = right ? 1 : -1;
      var yOffset = xOffset * slope;

      var xHit = null;
      var yHit = null;
      var distance = null;
      var xDistance = 10000;
      var yDistance = 10000;

      while (x < this.map.width && x > 0 && y < this.map.height && y > 0) {
        var mapCheck = this.map.data[Math.floor(y)][Math.floor(x + (right ? 0 : -1))];

        if (mapCheck > 0) {
          xHit = x;
          yHit = y;
          xDistance = x - this.parent.x;
          yDistance = y - this.parent.y;

          distance = xDistance * xDistance + yDistance * yDistance;
          break;
        }

        x += xOffset;
        y += yOffset;
      }

      slope = cos / sin;
      yOffset = up ? -1 : 1;
      xOffset = yOffset * slope;
      y = up ? Math.floor(this.parent.y) : Math.ceil(this.parent.y);
      x = this.parent.x + (y - this.parent.y) * slope;

      while (x < this.map.width && x > 0 && y < this.map.height && y > 0) {
        xDistance = x - this.parent.x;
        yDistance = y - this.parent.y;
        var distanceCheck = xDistance * xDistance + yDistance * yDistance;

        if (!distance || distanceCheck < distance) {
          var _mapCheck = this.map.data[Math.floor(y + (up ? -1 : 0))][Math.floor(x)];
          if (_mapCheck > 0) {
            xHit = x;
            yHit = y;
            distance = distanceCheck;
            break;
          }
        }

        x += xOffset;
        y += yOffset;
      }

      this.raycastContext.fillStyle = 'red';
      this.raycastContext.fillRect(xHit * 8, yHit * 8, 4, 4);

      if (xHit && yHit) {
        this.raycastContext.save();
        this.raycastContext.globalAlpha = 0.2;
        this.raycastContext.beginPath();
        this.raycastContext.moveTo(this.parent.x * 8, this.parent.y * 8);
        this.raycastContext.lineTo(xHit * 8, yHit * 8);
        this.raycastContext.strokeStyle = 'red';
        this.raycastContext.stroke();
        this.raycastContext.restore();
        distance = Math.sqrt(distance);
        distance = distance * Math.cos(this.parent.rotation * Math.PI / 180 - angle);

        return distance;
      }

      return 100000;
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
      if (this.rotation > 360) {
        this.rotation = 0;
      } else if (this.rotation < 0) {
        this.rotation = 360;
      }
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

var _map3 = __webpack_require__(4);

var _map4 = _interopRequireDefault(_map3);

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
      rotation: 0
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
      var scale = 8;
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

exports.default = map1;

/***/ })
/******/ ]);