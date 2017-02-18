export default class Enemy {
    constructor({ x = 0, y = 0, image = null, canvas = null, context = null }){
        this.x = x;
        this.y = y;
        this.image = image;
        this.canvas = canvas;
        this.context = context;
    }

    render(camera, focalLength, start, end){
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
            this.context.fillStyle = 'red';
            this.context.fillRect(x, y, size, size);
        }

        
    }
}