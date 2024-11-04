import { Juego } from "./Juego.js";

let canvas = document.getElementById("juego")
let ctx = canvas.getContext("2d")
let width = canvas.width;
let height = canvas.height;
let imageData = ctx.createImageData(width,height)
let nEnLinea = 4

// Inicializar el juego
const juego = new Juego(ctx, width, height, nEnLinea);

// Dibujar el juego
juego.dibujar();

canvas.addEventListener('mousedown', (e) => { //detecta el click sobre el canvas cuando el usuario mantiene abajo el click, es decir mientras lo esta apretando
    const mouseX = getPosMouse(e).x;
    const mouseY = getPosMouse(e).y;

    const columna = juego.tablero.obtenerColumnaDesdeMouse(mouseX);
});

canvas.addEventListener("mousemove", (event) => {
    const mousePos = getPosMouse(event);
    const columna = juego.tablero.obtenerColumnaDesdeMouse(mousePos.x);

    juego.resaltar(ctx,columna);
});


canvas.addEventListener("click", (event) => {
    const mousePos = getPosMouse(event);
    const columna = juego.tablero.obtenerColumnaDesdeMouse(mousePos.x);

    if (columna !== -1) {
        juego.agregarFicha(ctx, columna);
        limpiarCanvas();
        juego.dibujar();
    }
});

function limpiarCanvas(){
    // Limpia el canvas antes de redibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getPosMouse(event){
    return { //objeto
        x: Math.round(event.clientX - canvas.offsetLeft),  //math round devuelve un valor redondo
        y: Math.round(event.clientY - canvas.offsetTop)
    };
}