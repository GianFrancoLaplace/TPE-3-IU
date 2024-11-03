import { Jugador } from "./Jugador.js";
import { Tablero } from "./Tablero.js";

export class Juego {    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.tablero = new Tablero(width, height);

        // variables de pos de jugadores
        let widthPlayer = 100;
        let heightPlayer = 200;
        let posXPlayer1 = width / 20;;
        let posXPlayer2 = width - (width / 20 + widthPlayer);
        let widthFicha = 25;
        let posYJugador = (this.tablero.y + this.tablero.height - heightPlayer) 

        this.jugador1 = new Jugador("Player 1", "#F9A825", "#1565C0", posXPlayer1, posYJugador, widthPlayer, heightPlayer, widthFicha);
        this.jugador2 = new Jugador("Player 2", "#29B6F6", "#039BE5", posXPlayer2, posYJugador, widthPlayer, heightPlayer, widthFicha);
        this.turnoActual = this.jugador1;
    }

    dibujar() {
        this.tablero.dibujarHuecos(this.ctx);
        this.tablero.dibujarFlechas(this.ctx);
        this.jugador1.dibujarArea(this.ctx);
        this.jugador1.dibujarFicha(this.ctx);
        this.jugador2.dibujarArea(this.ctx);
        this.jugador2.dibujarFicha(this.ctx);
        this.dibujarInfo();
    }

    dibujarInfo() {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "24px Arial";

        // Textos a dibujar
        const turnoText = `Turno de ${this.turnoActual.nombre}`;
        const tiempoText = "Tiempo: 121 segundos";

        // Obtener medidas
        const turnoWidth = this.ctx.measureText(turnoText).width;
        const tiempoWidth = this.ctx.measureText(tiempoText).width;

        // Calcular posiciones centradas
        const turnoX = (this.width - turnoWidth) / 2;
        const tiempoX = (this.width - tiempoWidth) / 2;

        // Altura de la fuente (aproximada)
        const lineHeight = 24; // Esto es aproximado basado en el tamaño de la fuente

        const margin = 42;

        // Dibujar textos centrados
        this.ctx.fillText(turnoText, turnoX, lineHeight + margin); 
        this.ctx.fillText(tiempoText, tiempoX, lineHeight * 2.5 + margin);
    }

    actualizarTablero(ctx, posiciones) {
        const columnaHover = this.tablero.obtenerColumnaDesdeMouse(posiciones);
        this.tablero.dibujarHuecos(ctx, columnaHover);
    }

    resaltar(ctx, columna) {
        this.tablero.dibujarHuecos(ctx, columna)
    }

    cambiarTurno() {
        this.turnoActual = this.turnoActual === this.jugador1 ? this.jugador2 : this.jugador1;
    }

    agregarFicha() {
        return null;
    }
}


