// const textures = ['w_1.png', 'w_2.png', 'w_3.png', 'w_4.png', 'w_5.png'];
const textures = {
  0: 'd_0.png',
  1: 'w_1.png',
  2: 'w_2.png',
  3: 'w_3.png',
  4: 'w_4.png',
  5: 'w_5.png',
  6: 'd_1.png'
}

export default class Textures {
  constructor(){
    this.tiles = [];
    this.textures = [];
    this.canvases = [];
    this.loadedTextures = 0;
    this.texturesToLoad = 0;
  }

  getUniqueTiles(map){
    let tiles = [];
    let tilesToLoad = [];
    for(let y=0; y<map.length; y++){
      for(let x=0; x<map[y].length; x++){
        let tile = map[y][x];
        if(tiles.indexOf(tile) == -1 && tile > 0){
          tiles[tile] = tile;
          tilesToLoad.push(tile);
        }
      }
    }
    tiles[0] = 0;
    this.texturesToLoad = tilesToLoad;

    return tiles.map((index) => {
      return textures[index]
    });
  }

  preloadTextures(map){

    return new Promise((resolve, reject) => {
      this.tiles = this.getUniqueTiles(map);
      for(let t = 0; t<this.tiles.length; t++){
        let tile = this.tiles[t];
        if(tile){
          let image = new Image();
          image.src = `./assets/${tile}`;
          image.onload = () => {
            this.textures[t] = image;
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = image.width * 3;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            context.drawImage(image, image.width, 0, image.width, image.height);
            context.drawImage(image, image.width * 2, 0, image.width, image.height);
            this.canvases[t] = {
              canvas: canvas,
              context: context
            }

            if(this.loadedTextures >= this.texturesToLoad.length){
              resolve(this.textures);
            }
            this.loadedTextures++;
          }
        }
      }
    })
  }

  getTexture(tile, offset, tileWidth, side, context, columnX, columnY, tileHeight){
    // console.log(tile);
    let width = this.textures[tile].width;
    let height = this.textures[tile].width;
    let texture = this.textures[tile];
    let x = Math.round((width * offset) - (tileWidth / 2)) + width;
    let y = 0;

    if(side > 0){
      y = width;
    }
    context.drawImage(this.canvases[tile].canvas, x, y, tileWidth, height, columnX, columnY, tileWidth, tileHeight);
  }
}
