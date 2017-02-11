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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Camera {
  constructor({ parent, canvas, map, raycastCanvas } = {}) {
    this.parent = parent;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.raycastCanvas = raycastCanvas;
    this.raycastContext = this.raycastCanvas.getContext('2d');
  }

  update() {
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.rotation = this.parent.rotation;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 3, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 4, 3, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

/* harmony default export */ __webpack_exports__["a"] = map1;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor({ map = [[0]], x = 0, y = 0, rotation = 0 } = {}) {
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

  update() {
    this.rotation += this.direction * this.rotationSpeed * window.deltaTime;
    let moveStep = this.speed * this.moveSpeed;
    let radians = this.rotation * Math.PI / 180;

    let moveX = Math.cos(radians) * moveStep;
    let moveY = Math.sin(radians) * moveStep;

    let newX = this.x + moveX * window.deltaTime;
    let newY = this.y + moveY * window.deltaTime;

    if (!this.hitTest(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  hitTest(x, y) {
    return this.map.data[Math.floor(y)][Math.floor(x)] > 0;
  }

  bindKeys() {
    document.onkeydown = e => {
      let key = e.keyCode ? e.keyCode : e.which;

      switch (key) {
        case 38:
          this.speed = 1;
          break;
        case 40:
          this.speed = -1;
          break;
        case 37:
          this.direction = -1;
          break;
        case 39:
          this.direction = 1;
          break;
      }
    };

    document.onkeyup = e => {
      let key = e.keyCode ? e.keyCode : e.which;

      switch (key) {
        case 38:
          this.speed = 0;
          break;
        case 40:
          this.speed = 0;
          break;
        case 37:
          this.direction = 0;
          break;
        case 39:
          this.direction = 0;
          break;
      }
    };
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map1__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__camera__ = __webpack_require__(0);




class RaycastEngine {
  constructor(elementId) {
    this.canvas = document.getElementById(elementId);
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.map = {
      data: __WEBPACK_IMPORTED_MODULE_0__map1__["a" /* default */],
      width: __WEBPACK_IMPORTED_MODULE_0__map1__["a" /* default */][0].length,
      height: __WEBPACK_IMPORTED_MODULE_0__map1__["a" /* default */].length
    };
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]({
      map: this.map,
      x: 10,
      y: 10,
      rotation: 20
    });
    // Raycast Canvas
    this.raycastCanvas = document.createElement('canvas');
    this.raycastContext = this.raycastCanvas.getContext('2d');
    this.camera = new __WEBPACK_IMPORTED_MODULE_2__camera__["a" /* default */]({ parent: this.player, canvas: this.canvas, map: this.map, raycastCanvas: this.raycastCanvas });
    window.deltaTime = 0;
    window.lastUpdate = Date.now();
    document.body.appendChild(this.raycastCanvas);

    this.gameLoop();
  }

  update() {
    this.player.update();
    this.drawRaycastCanvas();
    this.camera.update();
  }

  drawRaycastCanvas() {
    const scale = 20;
    this.raycastCanvas.width = this.map.width * scale;
    this.raycastCanvas.height = this.map.height * scale;
    this.raycastContext.clearRect(0, 0, this.map.width * scale, this.map.height * scale);

    for (let y in this.map.data) {
      for (let x in this.map.data[y]) {
        if (this.map.data[y][x] > 0) {
          this.raycastContext.fillStyle = '#ccc';
          this.raycastContext.fillRect(x * scale, y * scale, scale, scale);
        } else {
          this.raycastContext.strokeStyle = '#ccc';
          this.raycastContext.strokeRect(x * scale, y * scale, scale, scale);
        }
      }
    }

    let radians = this.player.rotation * Math.PI / 180;

    this.raycastContext.save();
    this.raycastContext.translate(this.player.x * scale, this.player.y * scale);
    this.raycastContext.rotate(radians);
    this.raycastContext.fillStyle = '#000';
    this.raycastContext.fillRect(-scale / 4, -scale / 4, scale / 2, scale / 2);
    this.raycastContext.restore();
  }

  gameLoop() {
    let currentFrameTime = Date.now();
    window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
    window.lastUpdate = currentFrameTime;
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }
}

window.RaycastEngine = RaycastEngine;

/***/ })
/******/ ]);