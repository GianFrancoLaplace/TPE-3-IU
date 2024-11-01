export class Jugador {
    constructor(nombre, colorFicha, colorArea, posicionX, posicionY, widthArea, heightArea, sizeFicha) {
        this.nombre = nombre;
        this.colorFicha = colorFicha;
        this.colorArea = colorArea;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.widthArea = widthArea;
        this.heightArea = heightArea;
        this.sizeFicha = sizeFicha;
    }

    dibujarArea(ctx) {
        ctx.fillStyle = this.colorArea;
        ctx.fillRect(this.posicionX, this.posicionY, this.widthArea, this.heightArea);
    }

    dibujarFicha(ctx) {
        ctx.fillStyle = this.colorFicha;
        ctx.beginPath();
        ctx.arc(this.posicionX + this.widthArea / 2, this.posicionY + this.heightArea / 2, this.sizeFicha, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
