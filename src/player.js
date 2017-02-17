export default class Player {
  constructor({ map = [[ 0 ]], x = 0, y = 0, rotation = 0, raycastCanvas = null } = {}){
    this.map = map;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.direction = 0;
    this.moveSpeed = 5;
    this.rotationSpeed = 180; // Half rotation per second
    this.rotation = rotation;
    this.bindKeys();
    this.hitTile = null;
    if(raycastCanvas){
      this.raycastCanvas = raycastCanvas;
      this.raycastContext = this.raycastCanvas.getContext('2d');
    }
    this.camera = null;
  }

  update(){
    this.rotation += (this.direction * this.rotationSpeed) * window.deltaTime;
    if(this.rotation > 360){
      this.rotation = 0;
    }
    else if(this.rotation < 0){
      this.rotation = 360;
    }
    let moveStep = (this.speed * this.moveSpeed);
    let radians = this.rotation * Math.PI / 180;

    let moveX = Math.cos(radians) * moveStep;
    let moveY = Math.sin(radians) * moveStep;

    let newX = this.x + (moveX * window.deltaTime);
    let newY = this.y + (moveY * window.deltaTime);

    if (!this.hitTest(newX, newY)){
      this.x = newX;
      this.y = newY;
    }

    this.checkForDoor();
  }

  hitTest(x, y){
    let mapCheck = this.map.data[Math.floor(y)][Math.floor(x)];
    this.hitTile = mapCheck;
    if(typeof mapCheck === 'object' && mapCheck.type() == 'door'){
      return !mapCheck.opened;
    }
    else {
      return this.map.data[Math.floor(y)][Math.floor(x)] > 0;
    }
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
        case 32:
          this.openDoor();
          break;
      }
    }
  }
  
  checkForDoor(){
    // Checks if player is standing in a door
    let mapX = Math.floor(this.x);
    let mapY = Math.floor(this.y);
    let mapCheck = this.map.data[mapY][mapX];
    if(typeof mapCheck === 'object' && mapCheck.type() == 'door'){
      mapCheck.resetTimer();
    }
  }

  openDoor(){
    let angle = this.rotation * Math.PI / 180;
    let distance = 1;
    let hitTile = this.camera.traverseGrid(angle, false);
    if(hitTile.tile && hitTile.distance <= distance){
      hitTile.tile.openDoor();
    }
    hitTile = this.camera.traverseGrid(angle, true);
    if(hitTile.tile && hitTile.distance <= distance){
      hitTile.tile.openDoor();
    }
  }

  castRay(angle, rayDistance){
    let twoPI = Math.PI * 2;
    angle %= twoPI;
    if (angle < 0) angle += twoPI;

    let right = angle > twoPI * 0.75 || angle < twoPI * 0.25;
    let up = (angle < 0 || angle > Math.PI);
    let distance = null;

    let x = right ? Math.ceil(this.x) : Math.floor(this.x -1);
    let y = Math.floor(this.y);
    let mapCheck = this.map.data[y] ? this.map.data[y][x] : 0;

    if(mapCheck && typeof mapCheck === 'object' && mapCheck.type() == 'door'){
      distance = x - this.x;
    }

    x = Math.floor(this.x);
    y = up ? Math.floor(this.y - 1) : Math.ceil(this.y);
    mapCheck = this.map.data[y] ? this.map.data[y][x] : 0;
    if(mapCheck && typeof mapCheck === 'object' && mapCheck.type() == 'door'){
      let distanceCheck = y - this.y;
      if(distanceCheck < distance){
        distance = distanceCheck;
      }
    }

    console.log(distance);

    // let xOffset = right ? 1 : -1;
    // let yOffset = xOffset * slope;
    // let distance = null;

    // let xDistance = x - this.x;
    // let yDistance = y - this.y;
    // let mapX = Math.floor(x + (right ? 0 : -1));
    // let mapY = Math.floor(y);
    // let mapCheck = this.map.data[mapY] ? this.map.data[mapY][mapX] : null;
    // console.log(angle, xOffset);

    // if(typeof mapCheck === 'object' && mapCheck.type() == 'door'){
    //   distance = xDistance * xDistance + yDistance * yDistance;
    // }

    // slope = cos / sin;
    // y = up ? Math.floor(this.y) : Math.ceil(this.y);
    // x = this.x + (y - this.y) * slope;
    // yOffset = up ? -1 : 1;
    // xOffset = yOffset * slope;
    // xDistance = x - this.x;
    // yDistance = y - this.y;
    // mapY = Math.floor(y + (up ? -1 : 0));
    // mapX = Math.floor(x);
    // mapCheck = this.map.data[mapY] ? this.map.data[mapY][mapX] : null;
    // let distanceCheck = xDistance * xDistance + yDistance * yDistance;

    // if(typeof mapCheck === 'object' && mapCheck.type() == 'door' && (!distance || distanceCheck > distance)){
    //   distance = distanceCheck;
    // }
    
    // if(distance){
    //   console.log(distance, 'door hit');
    // }
  }

}
