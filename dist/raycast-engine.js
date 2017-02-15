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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parent = _ref.parent,
        canvas = _ref.canvas,
        map = _ref.map,
        raycastCanvas = _ref.raycastCanvas,
        textures = _ref.textures,
        _ref$ceilingColor = _ref.ceilingColor,
        ceilingColor = _ref$ceilingColor === undefined ? '#383838' : _ref$ceilingColor,
        _ref$floorColor = _ref.floorColor,
        floorColor = _ref$floorColor === undefined ? '#707070' : _ref$floorColor;

    _classCallCheck(this, Camera);

    this.parent = parent;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.map = map;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.textures = textures;
    this.columnWidth = 2;
    this.focalLength = this.canvas.height / this.columnWidth;
    this.ceilingColor = ceilingColor;
    this.floorColor = floorColor;
    if (raycastCanvas) {
      this.raycastCanvas = raycastCanvas;
      this.raycastContext = this.raycastCanvas.getContext('2d');
    }
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
      this.drawBackground();
      var columnsToDraw = [];
      var maxWallHeight = this.canvas.height;
      for (var column = 0; column < columns; column++) {
        var x = -columns / 2 + column;
        var angle = Math.atan2(x, this.focalLength);
        var radians = this.parent.rotation * Math.PI / 180;
        var hitData = this.castRay(radians + angle);
        var z = hitData.distance;
        var texture = hitData.texture;
        var height = this.canvas.height / z;
        var columnX = column * this.columnWidth;
        var columnY = this.canvas.height / 2 - height / 2;
        this.textures.getTexture(texture.type, texture.offset, this.columnWidth, hitData.side, this.context, columnX, columnY, height);
      }
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      this.context.fillStyle = this.ceilingColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
      this.context.fillStyle = this.floorColor;
      this.context.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
    }
  }, {
    key: 'castRay',
    value: function castRay(angle) {
      var twoPI = Math.PI * 2;
      angle %= twoPI;
      if (angle < 0) angle += twoPI;

      var hitData = this.traverseGrid(angle, false);
      hitData = this.traverseGrid(angle, true, hitData);

      if (hitData.xHit && hitData.yHit) {
        if (this.raycastCanvas) {
          this.raycastContext.save();
          this.raycastContext.globalAlpha = 0.2;
          this.raycastContext.beginPath();
          this.raycastContext.moveTo(this.parent.x * 8, this.parent.y * 8);
          this.raycastContext.lineTo(hitData.xHit * 8, hitData.yHit * 8);
          this.raycastContext.strokeStyle = 'red';
          this.raycastContext.stroke();
          this.raycastContext.restore();
        }
        hitData.distance = Math.sqrt(hitData.distance);
        hitData.distance = hitData.distance * Math.cos(this.parent.rotation * Math.PI / 180 - angle);

        return {
          distance: hitData.distance,
          texture: hitData.texture,
          side: hitData.side
        };
      }

      return {
        distance: 10000,
        texture: hitData.texture,
        side: hitData.side
      };
    }
  }, {
    key: 'traverseGrid',
    value: function traverseGrid(angle) {
      var vertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var oldHitData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var twoPI = Math.PI * 2;
      var right = angle > twoPI * 0.75 || angle < twoPI * 0.25;
      var up = angle < 0 || angle > Math.PI;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var xDistance = 10000;
      var yDistance = 10000;
      var slope = vertical ? cos / sin : sin / cos;
      var x = right ? Math.ceil(this.parent.x) : Math.floor(this.parent.x);
      var y = this.parent.y + (x - this.parent.x) * slope;
      var xOffset = right ? 1 : -1;
      var yOffset = xOffset * slope;
      if (vertical) {
        y = up ? Math.floor(this.parent.y) : Math.ceil(this.parent.y);
        x = this.parent.x + (y - this.parent.y) * slope;
        yOffset = up ? -1 : 1;
        xOffset = yOffset * slope;
      }
      var hitData = {
        distance: null,
        texture: {
          type: 0,
          offset: 0
        },
        side: 0,
        xHit: null,
        yHit: null
      };
      if (oldHitData) {
        hitData = oldHitData;
      }
      while (x < this.map.width && x > 0 && y < this.map.height && y > 0) {
        xDistance = x - this.parent.x;
        yDistance = y - this.parent.y;
        var distanceCheck = xDistance * xDistance + yDistance * yDistance;

        if (!vertical || !hitData.distance || distanceCheck < hitData.distance) {
          var mapX = vertical ? Math.floor(x) : Math.floor(x + (right ? 0 : -1));
          var mapY = vertical ? Math.floor(y + (up ? -1 : 0)) : Math.floor(y);
          var mapCheck = this.map.data[mapY][mapX];

          // Check if tile is a door
          if (this.checkIfDoor(mapCheck) && !mapCheck.opened) {
            var testX = x + xOffset / 2;
            var testY = y + yOffset / 2;
            var testMapX = Math.floor(testX);
            var testMapY = Math.floor(testY);

            if (testMapX > 0 && testMapX < this.map.width && testMapY > 0 && testMapY < this.map.height) {
              if (this.checkIfDoor(this.map.data[testMapY][testMapX])) {
                xDistance = testX - this.parent.x;
                yDistance = testY - this.parent.y;
                hitData.xHit = testX;
                hitData.yHit = testY;
                hitData.texture.type = mapCheck.tile;
                hitData.side = vertical ? 1 : 0;
                hitData.texture.offset = vertical ? hitData.xHit - mapX : hitData.yHit - mapY;
                hitData.distance = xDistance * xDistance + yDistance * yDistance;
                break;
              }
            }
          }

          // Check if neighbouring tiles are doors
          if (vertical && mapCheck > 0) {
            var prevMapCheck = this.map.data[mapY][mapX];
            var afterMapCheck = this.map.data[mapY][mapX];

            if (mapY - 1 > 0 && mapY + 1 < this.map.height) {
              prevMapCheck = this.map.data[mapY + (up ? 1 : -1)][mapX];
              afterMapCheck = this.map.data[mapY + (up ? -1 : 1)][mapX];
            }

            if (this.checkIfDoor(prevMapCheck) || this.checkIfDoor(afterMapCheck)) {
              hitData.xHit = x;
              hitData.yHit = y;
              hitData.texture.type = 0;
              hitData.side = vertical ? 1 : 0;
              hitData.texture.offset = vertical ? hitData.xHit - mapX : hitData.yHit - mapY;
              hitData.distance = distanceCheck;

              break;
            }
          }
          // Check if neighbouring tiles are doors
          else if (!vertical && mapCheck > 0) {
              var _prevMapCheck = this.map.data[mapY][mapX];
              var _afterMapCheck = this.map.data[mapY][mapX];

              if (mapX - 1 > 0 && mapX + 1 < this.map.width) {
                _prevMapCheck = this.map.data[mapY][mapX + (right ? -1 : 1)];
                _afterMapCheck = this.map.data[mapY][mapX + (right ? -1 : 1)];
              }

              if (this.checkIfDoor(_prevMapCheck) || this.checkIfDoor(_afterMapCheck)) {
                hitData.xHit = x;
                hitData.yHit = y;
                hitData.texture.type = 0;
                hitData.side = vertical ? 1 : 0;
                hitData.texture.offset = vertical ? hitData.xHit - mapX : hitData.yHit - mapY;
                hitData.distance = distanceCheck;

                break;
              }
            }

          // Check if tile is a wall
          if (mapCheck > 0) {
            hitData.xHit = x;
            hitData.yHit = y;
            hitData.texture.type = mapCheck;
            hitData.side = vertical ? 1 : 0;
            hitData.texture.offset = vertical ? hitData.xHit - mapX : hitData.yHit - mapY;
            hitData.distance = distanceCheck;
            break;
          }
        }

        x += xOffset;
        y += yOffset;
      }

      return hitData;
    }
  }, {
    key: 'checkIfDoor',
    value: function checkIfDoor(tile) {
      return (typeof tile === 'undefined' ? 'undefined' : _typeof(tile)) === 'object' && tile.type() == 'door';
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
var map1 = exports.map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 3, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 2], [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1], [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 3, 3, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

var map1_doors = exports.map1_doors = [6];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

exports.default = map1;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    key: 'update',
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
    key: 'hitTest',
    value: function hitTest(x, y) {
      var mapCheck = this.map.data[Math.floor(y)][Math.floor(x)];
      if ((typeof mapCheck === 'undefined' ? 'undefined' : _typeof(mapCheck)) === 'object' && mapCheck.type() == 'door') {
        return !mapCheck.opened;
      } else {
        return this.map.data[Math.floor(y)][Math.floor(x)] > 0;
      }
    }
  }, {
    key: 'bindKeys',
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const textures = ['w_1.png', 'w_2.png', 'w_3.png', 'w_4.png', 'w_5.png'];
var textures = {
  0: 'd_0.png',
  1: 'w_1.png',
  2: 'w_2.png',
  3: 'w_3.png',
  4: 'w_4.png',
  5: 'w_5.png',
  6: 'd_1.png'
};

var Textures = function () {
  function Textures() {
    _classCallCheck(this, Textures);

    this.tiles = [];
    this.textures = [];
    this.canvases = [];
  }

  _createClass(Textures, [{
    key: 'getUniqueTiles',
    value: function getUniqueTiles(map) {
      var tiles = [];
      for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
          var tile = map[y][x];
          if (tiles.indexOf(tile) == -1 && tile > 0) {
            tiles[tile] = tile;
          }
        }
      }
      tiles[0] = 0;

      return tiles.map(function (index) {
        return textures[index];
      });
    }
  }, {
    key: 'preloadTextures',
    value: function preloadTextures(map) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.tiles = _this.getUniqueTiles(map);

        var _loop = function _loop(t) {
          var tile = _this.tiles[t];
          if (tile) {
            (function () {
              var image = new Image();
              image.src = './assets/' + tile;
              image.onload = function () {
                _this.textures[t] = image;
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = image.width * 3;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height);
                context.drawImage(image, image.width, 0, image.width, image.height);
                context.drawImage(image, image.width * 2, 0, image.width, image.height);
                _this.canvases[t] = {
                  canvas: canvas,
                  context: context
                };
                if (_this.textures.length >= _this.tiles.length) {
                  resolve(_this.textures);
                }
              };
            })();
          }
        };

        for (var t = 0; t < _this.tiles.length; t++) {
          _loop(t);
        }
      });
    }
  }, {
    key: 'getTexture',
    value: function getTexture(tile, offset, tileWidth, side, context, columnX, columnY, tileHeight) {
      // console.log(tile);
      var width = this.textures[tile].width;
      var height = this.textures[tile].width;
      var texture = this.textures[tile];
      var x = Math.round(width * offset - tileWidth / 2) + width;
      var y = 0;

      if (side > 0) {
        y = width;
      }
      context.drawImage(this.canvases[tile].canvas, x, y, tileWidth, height, columnX, columnY, tileWidth, tileHeight);
    }
  }]);

  return Textures;
}();

exports.default = Textures;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(1);

var _map2 = __webpack_require__(2);

var _map3 = _interopRequireDefault(_map2);

var _mapBuilder = __webpack_require__(6);

var _mapBuilder2 = _interopRequireDefault(_mapBuilder);

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _camera = __webpack_require__(0);

var _camera2 = _interopRequireDefault(_camera);

var _textures = __webpack_require__(4);

var _textures2 = _interopRequireDefault(_textures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RaycastEngine = function () {
  function RaycastEngine(elementId, debugMode) {
    var _this = this;

    _classCallCheck(this, RaycastEngine);

    this.canvas = document.getElementById(elementId);
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.map = (0, _mapBuilder2.default)(_map.map1, _map.map1_doors);
    this.textures = new _textures2.default();
    this.player = new _player2.default({
      map: this.map,
      x: 10,
      y: 10,
      rotation: 0
    });
    this.debugMode = debugMode;
    this.raycastCanvas = null;

    if (this.debugMode) {
      this.raycastCanvas = document.createElement('canvas');
      this.raycastContext = this.raycastCanvas.getContext('2d');
      document.body.appendChild(this.raycastCanvas);
    }

    this.camera = new _camera2.default({ parent: this.player, canvas: this.canvas, map: this.map, raycastCanvas: this.raycastCanvas, textures: this.textures });
    window.deltaTime = 0;
    window.lastUpdate = Date.now();

    this.textures.preloadTextures(_map.map1).then(function () {
      return _this.gameLoop();
    });
  }

  _createClass(RaycastEngine, [{
    key: 'update',
    value: function update() {
      this.player.update();
      if (this.debugMode) {
        this.drawRaycastCanvas();
      }
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
      var _this2 = this;

      var currentFrameTime = Date.now();
      window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
      window.lastUpdate = currentFrameTime;
      this.update();

      window.requestAnimationFrame(function () {
        return _this2.gameLoop();
      });
    }
  }]);

  return RaycastEngine;
}();

window.RaycastEngine = RaycastEngine;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _door = __webpack_require__(7);

var _door2 = _interopRequireDefault(_door);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapBuilder = function mapBuilder(mapData, doors) {
    var map = mapData.map(function (rows) {
        return rows.map(function (tile) {
            if (doors.indexOf(tile) > -1) {
                return new _door2.default({ tile: tile });
            } else {
                return tile;
            }
        });
    });

    return {
        data: map,
        width: map[0].length,
        height: map.length
    };
};

exports.default = mapBuilder;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Door = function () {
    function Door() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$tile = _ref.tile,
            tile = _ref$tile === undefined ? 0 : _ref$tile,
            _ref$opened = _ref.opened,
            opened = _ref$opened === undefined ? false : _ref$opened,
            _ref$key = _ref.key,
            key = _ref$key === undefined ? null : _ref$key;

        _classCallCheck(this, Door);

        this.tile = tile;
        this.opened = opened;
        this.key = key;
        this.unlocked = key ? false : true;
    }

    _createClass(Door, [{
        key: 'type',
        value: function type() {
            return 'door';
        }
    }]);

    return Door;
}();

exports.default = Door;

/***/ })
/******/ ]);