import { Jugador } from "./Jugador.js";
import { Tablero } from "./Tablero.js";

export class Juego {    
    constructor(ctx, width, height, nEnLinea) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.nEnLinea = nEnLinea;
        this.tablero = new Tablero(width, height, 6, 7, nEnLinea);
        
        // Variables de posición de jugadores
        let widthPlayer = 100;
        let heightPlayer = 200;
        let posXPlayer1 = width / 20;
        let posXPlayer2 = width - (width / 20 + widthPlayer);
        let widthFicha = 25;
        let posYJugador = (this.tablero.y + this.tablero.height - heightPlayer);
        
        this.jugador1 = new Jugador(1, "Player 1", "#F9A825", "#1565C0", posXPlayer1, posYJugador, widthPlayer, heightPlayer, widthFicha);
        this.jugador2 = new Jugador(2, "Player 2", "#29B6F6", "#039BE5", posXPlayer2, posYJugador, widthPlayer, heightPlayer, widthFicha);
        this.turnoActual = this.jugador1;

        // Variables del cronómetro
        this.timeLeft = 60;
        this.timer = null;
    }

    // Modificar la función iniciarCronometro para asegurarse de que se llama a dibujarInfo solo una vez por segundo
    iniciarCronometro() {
        this.detenerCronometro(); // Reiniciar el cronómetro si ya estaba corriendo
        this.timeLeft = 60;
        this.timer = setInterval(() => {
            this.timeLeft--;
    
            // Limpiar y redibujar la información antes de cada actualización
            this.dibujarInfo(); 
    
            if (this.timeLeft <= 0) {
                this.detenerCronometro();
                alert(`Se acabó el tiempo para ${this.turnoActual.nombre}`);
                this.cambiarTurno();
            }
        }, 1000);
    }

    detenerCronometro() {
        clearInterval(this.timer);
        this.timer = null;
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
        // Limpiar un área más amplia para asegurarnos de que no queden restos del texto anterior
        const infoAreaY = 0; // Coordenada Y de inicio del área de limpieza
        const infoAreaHeight = 120; // Altura del área a limpiar (puedes aumentar o reducir si es necesario)
        this.ctx.clearRect(0, infoAreaY, this.width, infoAreaHeight);
    
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "24px Arial";
        this.ctx.textBaseline = "top"; // Fijar la base del texto para mantener una posición vertical constante
    
        // Textos a dibujar
        const turnoText = `Turno de ${this.turnoActual.nombre}`;
        const tiempoText = `Tiempo: ${this.timeLeft} segundos`;
    
        // Obtener medidas
        const turnoWidth = this.ctx.measureText(turnoText).width;
        const tiempoWidth = this.ctx.measureText(tiempoText).width;
    
        // Calcular posiciones centradas
        const turnoX = (this.width - turnoWidth) / 2;
        const tiempoX = (this.width - tiempoWidth) / 2;
    
        // Altura de la fuente y margen
        const lineHeight = 24;
        const margin = 42;
    
        // Dibujar textos en posiciones fijas
        this.ctx.fillText(turnoText, turnoX, margin); 
        this.ctx.fillText(tiempoText, tiempoX, margin + lineHeight * 1.5);
    }
    
    
   
    
    

    cambiarTurno() {
        this.detenerCronometro(); // Detener el cronómetro del turno anterior
        this.turnoActual = this.turnoActual === this.jugador1 ? this.jugador2 : this.jugador1;
        this.iniciarCronometro(); // Iniciar cronómetro para el nuevo turno
    }

    agregarFicha(ctx, columna) {
        this.tablero.agregarFicha(ctx, columna, this.turnoActual);
        this.cambiarTurno();
    }
}



