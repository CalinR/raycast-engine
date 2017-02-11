export default class Camera {
  constructor({ parent, canvas, map, raycastCanvas } = {}){
    this.parent = parent;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.raycastCanvas = raycastCanvas;
    this.raycastContext = this.raycastCanvas.getContext('2d');
  }

  update(){
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.rotation = this.parent.rotation;
  }
}
