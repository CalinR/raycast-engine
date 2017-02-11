export default class Player {
  constructor({ map = [[ 0 ]], x = 0, y = 0, rotation = 0 } = {}){
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

  update(){
    this.rotation += (this.direction * this.rotationSpeed) * window.deltaTime;
    let moveStep = (this.speed * this.moveSpeed);
    let radians = this.rotation * Math.PI / 180;

    let newX = Math.cos(radians) * moveStep;
    let newY = Math.sin(radians) * moveStep;

    this.x += newX * window.deltaTime;
    this.y += newY * window.deltaTime;
  }

  bindKeys(){
    document.onkeydown = (e) => {
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
    }

    document.onkeyup = (e) => {
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
    }

  }

}
