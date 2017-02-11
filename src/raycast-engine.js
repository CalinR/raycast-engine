import map1 from './map1'
import Player from './player'

class RaycastEngine {
  constructor(elementId){
    this.canvas = document.getElementById(elementId);
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.map = {
      data: map1,
      width: map1[0].length,
      height: map1.length
    };
    this.player = new Player({ map: this.map, x: 10, y: 10, rotation: 20 });
    window.deltaTime = 0;
    window.lastUpdate = Date.now();

    // Raycast Canvas
    this.raycastCanvas = document.createElement('canvas')
    this.raycastContext = this.raycastCanvas.getContext('2d');
    document.body.appendChild(this.raycastCanvas);

    this.gameLoop();
  }

  update(){
    this.player.update();
    this.drawRaycastCanvas();
  }

  drawRaycastCanvas(){
    const scale = 10;
    this.raycastCanvas.width = this.map.width * scale;
    this.raycastCanvas.height = this.map.height * scale;

    for(let y in this.map.data){
      for(let x in this.map.data[y]){
          if(this.map.data[y][x] > 0){
              this.raycastContext.fillStyle = '#ccc';
              this.raycastContext.fillRect(x * scale, y * scale, scale, scale);
          }
          else {
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
    this.raycastContext.fillRect(-scale/4, -scale/4, scale / 2, scale / 2);
    this.raycastContext.restore();
  }

  gameLoop(){
    let currentFrameTime = Date.now();
    window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
    window.lastUpdate = currentFrameTime;
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }
}

window.RaycastEngine = RaycastEngine;
