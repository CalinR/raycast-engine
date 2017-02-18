export default class Enemy {
    constructor({ x = 0, y = 0, texture = null, canvas = null, context = null }){
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.image = null;
        this.canvas = canvas;
        this.context = context;
    }

    render(hitData){
        if(this.image){
            // this.context.fillStyle = 'red';
            // this.context.fillRect(hitData.x, hitData.y, hitData.size, hitData.size);
            this.context.drawImage(this.image, hitData.x, hitData.y, hitData.size, hitData.size);
        }
    }

    calculate(camera){
        let dx = this.x - camera.x;
        let dy = this.y - camera.y;
        let angle = Math.atan2(dy, dx) - camera.rotation * (Math.PI / 180);

        if (angle < -Math.PI) angle += 2*Math.PI;
		if (angle >= Math.PI) angle -= 2*Math.PI;
        if (angle > -Math.PI*0.5 && angle < Math.PI*0.5) {
			let distance = Math.sqrt(dx*dx + dy*dy);
			let size = (this.canvas.height) / (Math.cos(angle) * distance);
			let x = Math.tan(angle) * this.canvas.height;
            let y = (this.canvas.height / 2) - (size / 2);
            x = (this.canvas.width/2 + x - size/2);
            let dbx = this.x - camera.x;
            let dby = this.y - camera.y;
            let blockDist = dbx*dbx + dby*dby;
            let zIndex = -Math.floor(blockDist*1000);

            return {
                distance: distance,
                zIndex: zIndex,
                x: x,
                y: y,
                size: size,
                sprite: this
            }
        }

        return null;
    }
}