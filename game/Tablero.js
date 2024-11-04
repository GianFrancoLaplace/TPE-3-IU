import { Jugador } from "./Jugador.js";

export class Tablero {
    constructor(width, height, rows = 6, cols = 7, nEnLinea) {
        this.width = width / 2;
        this.height = height / 2;
        // posiciones centradas = (width - widthDelafigura) /2
        this.x = (width - this.width) / 2;
        this.y = (height - this.height) / 2;
        this.rows = rows;
        this.cols = cols;
        this.nEnLinea = nEnLinea;
        this.cellRadius = this.width / (this.cols * 4); // tamaño de la celda
        this.cellSpacingX = this.cellRadius; // espacio entre celdas
        this.cellSpacingY = this.cellRadius / 2
        this.desplazamientoX = this.x + (this.width - (this.cols * (this.cellRadius * 2 + this.cellSpacingX))) / 2;
        this.desplazamientoY = this.y + (this.height - (this.rows * (this.cellRadius * 2 + this.cellSpacingY))) / 2;

        // Inicializa el estado del tablero con todas las posiciones vacías (null)
        this.boardState = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    }

    dibujarHuecos(ctx, highlightCol) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let PosX = this.desplazamientoX + col  * (this.cellRadius * 2 + this.cellSpacingX) + this.cellSpacingX*1.5;
                let posY = this.desplazamientoY + row  * (this.cellRadius * 2 + this.cellSpacingX) + this.cellSpacingY;

                // Resalta las columnas izquierda o derecha si `highlightCol` coincide
                if (highlightCol === col) {
                    ctx.fillStyle = "#FFFF00";
                } else if (this.boardState[row][col] === 1) {
                    ctx.fillStyle = "#FF0000";  // Ficha de jugador 1
                } else if(this.boardState[row][col] === 2){
                    ctx.fillStyle = "#0000FF";  // Ficha de jugador 1
                }else {
                    ctx.fillStyle = "#D9D9D9";
                }
    
                // Dibuja el hueco
                ctx.beginPath();
                ctx.arc(PosX, posY, this.cellRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
        }
        this.dibujarEjes(ctx);
    }
        

    obtenerColumnaDesdeMouse(x) {
        const columnaRelativa = (x - this.desplazamientoX - this.cellRadius) / (2 * this.cellRadius + this.cellSpacingX);
        const columna = Math.round(columnaRelativa);
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

    agregarFicha(ctx, col, turno){
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.boardState[row][col] === null) {
                // Marca la posición con una ficha (en este caso, de color rojo)
                this.boardState[row][col] = turno.numero;

                if(this.verificarGanador() != null){
                    console.log(turno);
                    alert("Ganaste: " + turno.nombre);
                    this.reiniciarTablero(this.boardState);
                }
                
                // Vuelve a dibujar el tablero con la nueva ficha
                this.dibujarHuecos(ctx);
                return; // Termina el método después de colocar la ficha
            }
        }
    }

    reiniciarTablero(matriz){
        for (const element of matriz) {
            element.fill(null);
        }
    }

    verificarGanador(){
        console.log(this.boardState);
        let horizontal = this.verificarGanadorHorizontal();

        if(horizontal!=null){
            return horizontal
        }

        let vertical = this.verificarGanadorVertical();        

        if(vertical!=null){
            return vertical
        }

        let diagonal = this.verificarGanadorDiagonal();
        console.log(diagonal);

        
        if(diagonal!=null){
            return diagonal
        }
    }

    verificarGanadorHorizontal() {
        for (let i = 0; i < this.boardState.length; i++) {
            for (let j = 0; j < this.boardState[i].length; j++) {
                let cont = 1;  // Resetear el contador por fila
                let huecoActual = this.boardState[i][j];
                let siguiente = this.boardState[i][j+1];
                let k = 1;
                while(huecoActual != null && huecoActual == siguiente && j + k < this.boardState[i].length){ 
                    if (cont >= this.nEnLinea) return huecoActual;
                    cont++;
                    huecoActual = siguiente;
                    siguiente = this.boardState[i][j+1+k];
                    k++;
                }
                if (cont >= this.nEnLinea) {
                    return huecoActual;
                }
            }
        }
        return null; // No hay ganador
    }
    

    verificarGanadorVertical() {
        for (let j = 0; j < this.cols; j++) {  // Cambiado para recorrer las columnas primero
            for (let i = 0; i < this.rows; i++) {
                let cont = 1;
                let huecoActual = this.boardState[i][j];
    
                // Solo comprobamos si hay un valor en la posición actual
                if (huecoActual != null) {
                    for (let k = 1; k < this.nEnLinea; k++) { 
                        // Verificamos si estamos dentro de los límites
                        if (i + k < this.rows && huecoActual === this.boardState[i + k][j]) {
                            cont++;
                        } else {
                            break;  // Salimos del loop si no coinciden o alcanzamos el borde
                        }
    
                        // Si alcanzamos la cantidad necesaria, retornamos el ganador
                        if (cont === this.nEnLinea) {
                            return huecoActual;
                        }
                    }
                }
            }
        }
        return null; // No hay ganador
    }
    
    

    verificarGanadorDiagonal() {
        // Diagonales (de arriba-izquierda a abajo-derecha)
        for (let row = 0; row <= this.rows - this.nEnLinea; row++) {
            for (let col = 0; col <= this.cols - this.nEnLinea; col++) {
                let cont = 1;
                let huecoActual = this.boardState[row][col];
                if (huecoActual === 0) continue;
    
                for (let k = 1; k < this.nEnLinea; k++) {
                    if (this.boardState[row + k][col + k] === huecoActual) {
                        cont++;
                        if (cont === this.nEnLinea) return huecoActual;
                    } else break;
                }
            }
        }
    
        // Diagonales (de arriba-derecha a abajo-izquierda)
        for (let row = 0; row <= this.rows - this.nEnLinea; row++) {
            for (let col = this.nEnLinea - 1; col < this.cols; col++) {
                let cont = 1;
                let huecoActual = this.boardState[row][col];
                if (huecoActual === 0) continue;
    
                for (let k = 1; k < this.nEnLinea; k++) {
                    if (this.boardState[row + k][col - k] === huecoActual) {
                        cont++;
                        if (cont === this.nEnLinea) return huecoActual;
                    } else break;
                }
            }
        }
    
        return null; // No hay ganador
    }    
}