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

    dibujarHuecos(ctx, highlightCol) {
        ctx.fillStyle = "#D9D9D9";
        for (let row = 0; row < this.rows; row++) {
            
            let colsSize = 0;
            
            if(this.cols % 2 == 0){
                colsSize = this.cols/2
            }else{
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + (row + 1) * (this.cellRadius * 2 + this.cellSpacingY), this.cellRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                colsSize = (this.cols/2) - 0.5
            }
                    
            
            for(let col = 0; col < colsSize; col++){
                let izqPosX = this.x + this.width / 2 - (col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
                let derPosX = this.x + this.width / 2 + (col + 1) * (this.cellRadius * 2 + this.cellSpacingX);
    
                let posY = this.y + (row + 1) * (this.cellRadius * 2 + this.cellSpacingY);
    
                if (col === highlightCol) {
                    ctx.fillStyle = "#FFFF00"; // Color de resaltado
                } else {
                    ctx.fillStyle = "#D9D9D9";
                }
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
        this.dibujarEjes(ctx);
    } 

    obtenerColumnaDesdeMouse(x) {
        const columnaRelativa = (x - this.desplazamientoX - this.cellRadius) / (2 * this.cellRadius + this.cellSpacingX);
        const columna = Math.floor(columnaRelativa);
        return (columna >= 0 && columna < this.cols) ? columna : -1;
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
        
        let colsSize = 0;
            
        if(this.cols % 2 == 0){
            colsSize = this.cols/2
        }else{
            let mitad = this.x + (this.width + arrowSize) / 2
            let posY = (this.height -arrowSize)  / 2

            ctx.beginPath();
            ctx.moveTo(mitad - arrowSize, posY);
            ctx.lineTo(mitad - arrowSize / 2, posY+arrowSize); // Trazo horizontal
            ctx.lineTo(mitad, posY); //trazo diagonal hacia abajo
            ctx.fill();
            ctx.closePath();
            colsSize = (this.cols/2) - 0.5
        }
                    
            
        for(let col = 0; col < colsSize; col++) {
            const derArrowX = this.x + this.width / 2 + col * (this.cellRadius * 2 + this.cellSpacingX) + arrowSize * 3;
            const izqArrowX = this.x + this.width / 2 -  col * (this.cellRadius * 2 + this.cellSpacingX) - arrowSize * 2; // Al dibujarse de izquierda a derecha hay que desplazarla por el doble de su ancho
            
            const arrowY = this.y + margen - arrowSize * 1.5; // Posición vertical de las flechas
            
            // Dibuja una flecha en forma de triángulo
            ctx.moveTo(derArrowX - arrowSize, arrowY);
            ctx.lineTo(derArrowX, arrowY); // Trazo horizontal
            ctx.lineTo(derArrowX - arrowSize / 2, arrowY + arrowSize); //trazo diagonal hacia abajo
            ctx.fill();
            ctx.closePath();

            // Dibuja una flecha en forma de triángulo
            ctx.beginPath();
            ctx.moveTo(izqArrowX - arrowSize, arrowY);
            ctx.lineTo(izqArrowX, arrowY); // Trazo horizontal
            ctx.lineTo(izqArrowX - arrowSize / 2, arrowY + arrowSize); //trazo diagonal hacia abajo
            ctx.fill();
            ctx.closePath();
        }
    }
}