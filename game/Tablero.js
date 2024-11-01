export class Tablero {
    constructor(width, height, rows = 6, cols = 7) {
        this.width = width * 0.5;
        this.height = height * 0.5;
        this.x = (width - this.width) / 2;
        this.y = (height - this.height) / 2;
        this.rows = rows;
        this.cols = cols;
        this.cellRadius = this.width / (this.cols * 4);
        this.cellSpacing = this.cellRadius / 2;
        this.desplazamientoX = this.x + (this.width - (this.cols * (this.cellRadius * 2 + this.cellSpacing))) / 2;
        this.desplazamientoY = this.y + (this.height - (this.rows * (this.cellRadius * 2 + this.cellSpacing))) / 2;
    }

    dibujarTablero(ctx) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    dibujarHuecos(ctx) {
        ctx.fillStyle = "#D9D9D9";
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let x = this.desplazamientoX + col * (this.cellRadius * 2 + this.cellSpacing);
                let y = this.desplazamientoY + row * (this.cellRadius * 2 + this.cellSpacing);
                
                ctx.beginPath();
                ctx.arc(x, y, this.cellRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    dibujarFlechas(ctx) {
    }
}