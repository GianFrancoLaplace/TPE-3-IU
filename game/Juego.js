import { Jugador } from "./Jugador.js";
import { Tablero } from "./Tablero.js";

export class Juego {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.tablero = new Tablero(width, height);
        this.jugador1 = new Jugador("Player 1", "#F9A825", "#1565C0", width / 20, (height - 200) / 2, 100, 200, 25);
        this.jugador2 = new Jugador("Player 2", "#29B6F6", "#039BE5", width - (width / 20 + 100), (height - 200) / 2, 100, 200, 25);
        this.turnoActual = this.jugador1;
    }

    dibujar() {
        this.tablero.dibujarTablero(this.ctx);
        this.tablero.dibujarHuecos(this.ctx);
        this.jugador1.dibujarArea(this.ctx);
        this.jugador1.dibujarFicha(this.ctx);
        this.jugador2.dibujarArea(this.ctx);
        this.jugador2.dibujarFicha(this.ctx);
        this.dibujarInfo();
    }

    dibujarInfo() {
        let sizeClock = 0, sizeText = 0;
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

    cambiarTurno() {
        this.turnoActual = this.turnoActual === this.jugador1 ? this.jugador2 : this.jugador1;
    }
}


