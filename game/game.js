import { Juego } from "./Juego.js";

let canvas = document.getElementById("juego")
let ctx = canvas.getContext("2d")
let width = canvas.width;
let height = canvas.height;
let imageData = ctx.createImageData(width,height)

// Inicializar el juego
const juego = new Juego(ctx, width, height);

// Dibujar el juego
juego.dibujar();