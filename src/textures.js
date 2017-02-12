const textures = ['w_1.png', 'w_2.png', 'w_3.png', 'w_4.png', 'w_5.png'];

export default class Textures {
  constructor(){
    this.tiles = [];
    this.textures = [];
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    // this.canvas.style.width = '50px';
    // document.body.appendChild(this.canvas);
  }

  getUniqueTiles(map){
    let tiles = [];
    for(let y=0; y<map.length; y++){
      for(let x=0; x<map[y].length; x++){
        let tile = map[y][x];
        if(tiles.indexOf(tile) == -1 && tile > 0){
          tiles[tile] = tile;
        }
      }
    }

    return tiles.map((index) => {
      return textures[index-1];
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
            if(this.textures.length >= this.tiles.length){
              resolve(this.textures);
            }
          }
        }
      }
    })
  }

  getTexture(tile, offset, tileWidth, side){
    // console.log(tile);
    let width = this.textures[tile].width;
    let height = this.textures[tile].width;
    let texture = this.textures[tile];
    let x = Math.round((width * offset) - (tileWidth / 2));

    // console.log(x);

    // console.log(x);

    this.canvas.width = tileWidth;
    this.canvas.height = height;
    this.context.clearRect(0, 0, tileWidth, height);
    this.context.drawImage(texture, 0, 0, width, height*2);
    this.context.drawImage(texture, -x, 0, width, height*2);
    this.context.drawImage(texture, width - x, 0, width, height * 2);
    // debugger;

    return this.canvas;
    // console.log(width, height);
    // console.log(`offset: ${offset}`, `side: ${side}`);
  }
}
