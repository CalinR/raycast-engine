export default class Camera {
  constructor({ parent, canvas, map, raycastCanvas, textures } = {}){
    this.parent = parent;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.map = map;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.textures = textures;
    this.raycastCanvas = raycastCanvas;
    this.raycastContext = this.raycastCanvas.getContext('2d');
    this.columnWidth = 2;
    this.focalLength = this.canvas.height / this.columnWidth;
    // this.createRays();
  }

  update(){
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.rotation = this.parent.rotation;
    this.createRays();
  }

  createRays(){
    let columns = Math.ceil(this.canvas.width / this.columnWidth);
    // columns = 1;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let columnsToDraw = [];
    let maxWallHeight = this.canvas.height;
    for(let column = 0; column < columns; column++){
      let x = (-columns / 2 + column);
      let angle = Math.atan2(x, this.focalLength);
      let radians = this.parent.rotation * Math.PI / 180;
      let hitData = this.castRay(radians + angle);
      let z = hitData.distance;
      let texture = hitData.texture;


      // console.log(texture);
      let height = this.canvas.height / z;
      let columnX = column * this.columnWidth;
      // this.context.fillStyle = '#000';
      // this.context.fillRect(columnX, (this.canvas.height / 2) - (height / 2), this.columnWidth, height);
      let imageSlice = this.textures.getTexture(texture.type, texture.offset, this.columnWidth, 1);
      this.context.drawImage(imageSlice, columnX, (this.canvas.height / 2) - (height / 2), this.columnWidth, height);
    }



    // let draw = (column) => {
    //   let x = (-columns / 2 + column);
    //   let angle = Math.atan2(x, this.focalLength);
    //   let radians = this.parent.rotation * Math.PI / 180;
    //   let hitData = this.castRay(radians + angle);
    //   let z = hitData.distance;
    //   let texture = hitData.texture;
    //
    //
    //   // console.log(texture);
    //   let height = this.canvas.height / z;
    //   let columnX = column * this.columnWidth;
    //   // this.context.fillStyle = '#000';
    //   // this.context.fillRect(columnX, (this.canvas.height / 2) - (height / 2), this.columnWidth, height);
    //   setTimeout(() => {
    //     let imageSlice = this.textures.getTexture(texture.type, texture.offset, this.columnWidth, 1);
    //     this.context.drawImage(imageSlice, columnX, (this.canvas.height / 2) - (height / 2), this.columnWidth, height);
    //     if(column < columns){
    //       column += 1;
    //       draw(column);
    //     }
    //   }, 100)
    // }
    //
    // draw(0);
  }

  castRay(angle){
    let twoPI = Math.PI * 2;
    angle %= twoPI;
  	if (angle < 0) angle += twoPI;
    let right = angle > twoPI * 0.75 || angle < twoPI * 0.25;
    let up = (angle < 0 || angle > Math.PI);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let xHit = null;
    let yHit = null;
    let distance = null;
    let xDistance = 10000;
    let yDistance = 10000;
    let texture = {
      type: 0,
      offset: 0
    };

    // Loop through grid horizontally
    let slope = sin / cos;
    let x = right ? Math.ceil(this.parent.x) : Math.floor(this.parent.x);
    let y = this.parent.y + (x - this.parent.x) * slope;
    let xOffset = right ? 1 : -1;
    let yOffset = xOffset * slope;

    while(x < this.map.width && x > 0 && y < this.map.height && y > 0){
      let mapX = Math.floor(x + (right ? 0 : -1));
      let mapY = Math.floor(y);
      let mapCheck = this.map.data[mapY][mapX];

      if(mapCheck > 0){
        xHit = x;
        yHit = y;
        xDistance = x - this.parent.x;
        yDistance = y - this.parent.y;
        texture.type = mapCheck;
        texture.offset = yHit - mapY;

        distance = xDistance * xDistance + yDistance * yDistance;
        break;
      }

      x += xOffset;
      y += yOffset;
    }

    // Loop through grid vertically
    slope = cos / sin;
    y = up ? Math.floor(this.parent.y) : Math.ceil(this.parent.y);
    x = this.parent.x + (y - this.parent.y) * slope;
    yOffset = up ? -1 : 1;
    xOffset = yOffset * slope;

    while(x < this.map.width && x > 0 && y < this.map.height && y > 0){
      xDistance = x - this.parent.x;
      yDistance = y - this.parent.y;
      let distanceCheck = xDistance * xDistance + yDistance * yDistance;

      if(!distance || distanceCheck < distance){
        let mapX = Math.floor(x);
        let mapY = Math.floor(y + (up ? -1 : 0));
        let mapCheck = this.map.data[mapY][mapX];
        if(mapCheck > 0){
          xHit = x;
          yHit = y;
          texture.type = mapCheck;
          texture.offset = xHit - mapX;

          distance = distanceCheck;
          break;
        }
      }

      x += xOffset;
      y += yOffset;
    }

    this.raycastContext.fillStyle = 'red';
    this.raycastContext.fillRect(xHit * 8, yHit * 8, 4, 4);

    if(xHit && yHit){
      this.raycastContext.save();
      this.raycastContext.globalAlpha = 0.2;
      this.raycastContext.beginPath();
      this.raycastContext.moveTo(this.parent.x * 8,this.parent.y * 8);
      this.raycastContext.lineTo(xHit * 8, yHit * 8);
      this.raycastContext.strokeStyle = 'red';
      this.raycastContext.stroke();
      this.raycastContext.restore();
      distance = Math.sqrt(distance);
  		distance = distance * Math.cos((this.parent.rotation * Math.PI / 180) - angle);

      return {
        distance: distance,
        texture: texture
      };
    }

    return {
      distance: 10000,
      texture: texture
    };

  }
}
