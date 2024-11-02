export class Tablero {
    constructor(width, height, rows = 6, cols = 7) {
        this.width = width / 2;
        this.height = height / 2;
        // posiciones centradas = (width - widthDelafigura) /2
        this.x = (width - this.width) / 2;
        this.y = (height - this.height) / 2;
        this.rows = rows;
        this.cols = cols;
        this.cellRadius = this.width / (this.cols * 4); // tamaño de la celda
        this.cellSpacingX = this.cellRadius; // espacio entre celdas
        this.cellSpacingY = this.cellRadius / 2
        this.desplazamientoX = this.x + (this.width - (this.cols * (this.cellRadius * 2 + this.cellSpacingX))) / 2; // this.x + (this.width - (this.cols * (this.cellRadius * 2 + this.cellSpacing))) / 2
        this.desplazamientoY = this.y + (this.height - (this.rows * (this.cellRadius * 2 + this.cellSpacingY))) / 2;

        // this.desplazamientoX = this.x + (this.width - (this.cols * (this.cellRadius * 2 + this.cellSpacing) - this.cellSpacing)) / 2;
        // this.desplazamientoY = this.y + (this.height - (this.rows * (this.cellRadius * 2 + this.cellSpacing) - this.cellSpacing)) / 2;

    }

    dibujarTablero(ctx) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.width, this.height);


    }

    dibujarHuecos(ctx) {
        ctx.fillStyle = "#D9D9D9";
        for (let row = 0; row < this.rows; row++) {
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + (row + 1) * (this.cellRadius * 2 + this.cellSpacingY), this.cellRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            if(this.cols % 2 == 0){
                for(let col = 0; col < this.cols / 2; col++){
                    let izqPosX = this.x + this.width / 2 -(col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
                    let derPosX = this.x + this.width / 2 + (col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
    
                    let posY = this.y + (row + 1) * (this.cellRadius * 2 + this.cellSpacingY);
    
                    // 
                    ctx.beginPath();
                    ctx.arc(izqPosX, posY, this.cellRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
    
                    // 
                    ctx.beginPath();
                    ctx.arc(derPosX, posY, this.cellRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
                }
            }else{
                for(let col = 0; col < (this.cols - 1) / 2; col++){
                    let izqPosX = this.x + this.width / 2 - (col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
                    let derPosX = this.x + this.width / 2 + (col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
    
                    let posY = this.y + (row + 1) * (this.cellRadius * 2 + this.cellSpacingY);
    
                    // 
                    ctx.beginPath();
                    ctx.arc(izqPosX, posY, this.cellRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
    
                    // 
                    ctx.beginPath();
                    ctx.arc(derPosX, posY, this.cellRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
                }
            }


            // for (let col = 0; col < this.cols; col++) {
            //     // (col + 1) y (row + 1) al empezar a contar desde 0 hay que sumarle uno 
            //     //  Para que quede centrado en el tablero
            //     let posX = this.x + (col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
            //     let posY = this.y + (row + 1) * (this.cellRadius * 2 + this.cellSpacingY);
                
            //     ctx.beginPath();
            //     ctx.arc(posX, posY, this.cellRadius, 0, Math.PI * 2);
            //     ctx.fill();
            //     ctx.closePath();
            // }
        }
        this.dibujarEjes(ctx);
    } 


    dibujarEjes(ctx){
        let colCentralX = (this.x + this.width / 2)
        let colCentralY = (this.y + this.height / 2)

        // Eje Y
        ctx.beginPath();
        ctx.moveTo(colCentralX, this.y);
        ctx.lineTo(colCentralX, this.y + this.height)
        ctx.stroke();
        ctx.closePath();

        // Eje X
        ctx.beginPath();
        ctx.moveTo(this.x, colCentralY);
        ctx.lineTo(this.x + this.width, colCentralY)
        ctx.stroke();
        ctx.closePath();
    }

    dibujarFlechas(ctx) {
        const arrowSize = this.cellRadius * 1.2; // Tamaño de la flecha
        let margen = 25;
        ctx.fillStyle = "#FFC107"; // Color de las flechas
        for (let col = 0; col < this.cols; col++) {
            const arrowX = this.desplazamientoX + col * (this.cellRadius * 2 + this.cellSpacingX);
            const arrowY = this.y + margen - arrowSize * 1.5; // Posición vertical de las flechas

            

            // Dibuja una flecha en forma de triángulo
            ctx.beginPath();
            ctx.moveTo(arrowX - arrowSize, arrowY);
            ctx.lineTo(arrowX, arrowY); // Trazo horizontal
            ctx.lineTo(arrowX - arrowSize / 2, arrowY + arrowSize); //trazo diagonal hacia abajo
            ctx.fill();
            ctx.closePath();
        }
    }
}