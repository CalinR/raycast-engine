window.test = 0;
export default class Camera {
  constructor({ parent, canvas, map, raycastCanvas, textures, ceilingColor = '#383838', floorColor = '#707070' } = {}){
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
    if(raycastCanvas){
      this.raycastCanvas = raycastCanvas;
      this.raycastContext = this.raycastCanvas.getContext('2d');
    }
    this.parent.camera = this;
    this.doors = [];
  }

  update(){
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.rotation = this.parent.rotation;
    this.createRays();
  }

  createRays(){
    let columns = Math.ceil(this.canvas.width / this.columnWidth);
    this.drawBackground();
    let columnsToDraw = [];
    let maxWallHeight = this.canvas.height;
    this.doors = [];
    for(let column = 0; column < columns; column++){
      let x = (-columns / 2 + column);
      let angle = Math.atan2(x, this.focalLength);
      let radians = this.parent.rotation * Math.PI / 180;
      let hitData = this.castRay(radians + angle);
      let z = hitData.distance;
      let texture = hitData.texture;
      let height = this.canvas.height / z;
      let columnX = column * this.columnWidth;
      let columnY = (this.canvas.height / 2) - (height / 2);
      this.textures.getTexture(texture.type, texture.offset, this.columnWidth, hitData.side, this.context, columnX, columnY, height);
    }

    // Update door if it is in line of site
    for(let door of this.doors){
      if(door){
        door.update();
      }
    }
  }

  drawBackground(){
    this.context.fillStyle = this.ceilingColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
    this.context.fillStyle = this.floorColor;
    this.context.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
  }

  castRay(angle){
    let twoPI = Math.PI * 2;
    angle %= twoPI;
    if (angle < 0) angle += twoPI;

    let hitData = this.traverseGrid(angle, false);
    hitData = this.traverseGrid(angle, true, hitData);

    if(hitData.xHit && hitData.yHit){
      if(this.raycastCanvas){
        this.raycastContext.save();
        this.raycastContext.globalAlpha = 0.2;
        this.raycastContext.beginPath();
        this.raycastContext.moveTo(this.parent.x * 8,this.parent.y * 8);
        this.raycastContext.lineTo(hitData.xHit * 8, hitData.yHit * 8);
        this.raycastContext.strokeStyle = 'red';
        this.raycastContext.stroke();
        this.raycastContext.restore();
      }
      hitData.distance = Math.sqrt(hitData.distance);
  		hitData.distance = hitData.distance * Math.cos((this.parent.rotation * Math.PI / 180) - angle);

      return {
        distance: hitData.distance,
        texture: hitData.texture,
        side: hitData.side,
        tile: hitData.tile
      };
    }

    return {
      distance: 10000,
      texture: hitData.texture,
      side: hitData.side,
      tile: hitData.tile
    };
  }

  traverseGrid(angle, vertical = false, oldHitData = null){
    let twoPI = Math.PI * 2;
    let right = angle > twoPI * 0.75 || angle < twoPI * 0.25;
    let up = (angle < 0 || angle > Math.PI);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let xDistance = 10000;
    let yDistance = 10000;
    let slope = vertical ? cos / sin : sin / cos;
    let x = right ? Math.ceil(this.parent.x) : Math.floor(this.parent.x);
    let y = this.parent.y + (x - this.parent.x) * slope;
    let xOffset = right ? 1 : -1;
    let yOffset = xOffset * slope;
    if(vertical){
      y = up ? Math.floor(this.parent.y) : Math.ceil(this.parent.y);
      x = this.parent.x + (y - this.parent.y) * slope;
      yOffset = up ? -1 : 1;
      xOffset = yOffset * slope;
    }
    let hitData = {
      distance: null,
      texture: {
        type: 0,
        offset: 0
      },
      side: 0,
      xHit: null,
      yHit: null
    }
    if(oldHitData){
      hitData = oldHitData;
    }
    while(x < this.map.width && x > 0 && y < this.map.height && y > 0){
      xDistance = x - this.parent.x;
      yDistance = y - this.parent.y;
      let distanceCheck = xDistance * xDistance + yDistance * yDistance;

      if(!vertical || !hitData.distance || distanceCheck < hitData.distance){
        let mapX = vertical ? Math.floor(x) : Math.floor(x + (right ? 0 : -1));
        let mapY = vertical ? Math.floor(y + (up ? -1 : 0)) : Math.floor(y);
        let mapCheck = this.map.data[mapY][mapX];


        // Check if tile is a door
        if(this.checkIfDoor(mapCheck)){
          this.doors[mapCheck.id] = mapCheck;
        }

        if(this.checkIfDoor(mapCheck) && !mapCheck.opened){
          let testX = x + (xOffset / 2);
          let testY = y + (yOffset / 2);
          let testMapX = Math.floor(testX);
          let testMapY = Math.floor(testY);

          if(testMapX > 0 && testMapX < this.map.width && testMapY > 0 && testMapY < this.map.height){
            let testMapCheck = this.map.data[testMapY][testMapX]
            if(this.checkIfDoor(testMapCheck)){
              let doorOffset = vertical ? testX % 1 : testY % 1;
              let textureOffset = testMapCheck.doorOpenValue;
              if(doorOffset > testMapCheck.doorOpenValue){
                xDistance = testX - this.parent.x;
                yDistance = testY - this.parent.y;
                hitData.xHit = testX;
                hitData.yHit = testY;
                hitData.texture.type = mapCheck.tile;
                hitData.tile = this.map.data[testMapY][testMapX];
                hitData.side = vertical ? 1 : 0;
                hitData.texture.offset = vertical ? hitData.xHit - mapX - textureOffset : hitData.yHit - mapY - textureOffset;
                hitData.distance = xDistance * xDistance + yDistance * yDistance;
                break;
              }
            }
          }
        }

        // Check if neighbouring tiles are doors
        if(vertical && mapCheck > 0){
          let prevMapCheck = this.map.data[mapY][mapX];
          let afterMapCheck = this.map.data[mapY][mapX];

          if(mapY-1 > 0 && mapY+1 < this.map.height){
            prevMapCheck = this.map.data[mapY + (up ? 1 : -1)][mapX];
            afterMapCheck = this.map.data[mapY + (up ? -1 : 1)][mapX];
          }

          if(this.checkIfDoor(prevMapCheck) || this.checkIfDoor(afterMapCheck)){
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
        else if (!vertical && mapCheck > 0){
          let prevMapCheck = this.map.data[mapY][mapX];
          let afterMapCheck = this.map.data[mapY][mapX];

          if(mapX-1 > 0 && mapX+1 < this.map.width){
            prevMapCheck = this.map.data[mapY][mapX + (right ? -1 : 1)];
            afterMapCheck = this.map.data[mapY][mapX + (right ? -1 : 1)];
          }

          if(this.checkIfDoor(prevMapCheck) || this.checkIfDoor(afterMapCheck)){
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
        if(mapCheck > 0){
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

  checkIfDoor(tile){
    return typeof tile === 'object' && tile.type() == 'door';
  }
}
