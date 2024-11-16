const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let clicked;
let cantFichasGan;
let tablero;
let j1;
let j2;
let indiceJugador=0;
let jugadorActual;
let fichaActual;
let containerMenu=document.getElementById("menu-container");
let controlesJuego=document.querySelectorAll(".control-juego");
let temporizadorUi=document.getElementById("temporizador");
let tiempoInicial=120;
let tiempo = tiempoInicial;
let temporizador;



// se les agrega las funcionalidades a los botones de "Jugar", "Jugar de nuevo" y del boton de "replay"
document.querySelectorAll(".btn-jugar").forEach(e=> {
  if(e.innerText=="JUGAR"){

    //hace que se oculte el fondo del menu
    e.addEventListener("click", function(){
      containerMenu.style.opacity="0";
      setTimeout(() => {
        containerMenu.style.display="none";
        containerMenu.style.visibility="hidden";
      }, 400);

      ocultarMenu("inicio");

      //se obtienen los avatares seleccionados por el usuario
      let j1Avatar=document.querySelector(".jugador1.selected").src;
      let j2Avatar=document.querySelector(".jugador2.selected").src;

      //se obtiene el modo de juego dependiendo de lo seleccionado por el usuario
      let modo=document.querySelector(".opcion-tablero.selected").id;

      IniciarJuegoPorTipo(j1Avatar, j2Avatar, modo);

      
      document.getElementById("replay").addEventListener("click", function(){
        //se reinicia el temporizador
        if(temporizador){
          clearInterval(temporizador);
        }
        IniciarJuegoPorTipo(j1Avatar, j2Avatar, modo);
      })
    })

  }else if(e.innerText=="Jugar de nuevo"){
    e.addEventListener("click", function(){
      
      setTimeout(()=>{
        mostrarMenu("inicio");
  
        ocultarMenu("final");
        ocultarMenu("empate");
      }, 400)
    })
  }

})

//se agrega la funcionalidades del movimiento del mouse en el canvas
canvas.onmousemove = function (e){
  if (clicked) {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujar();
    tablero.dibujarPila(j1, j2, cantFichasGan);
    fichaActual.dibujar(ctx,x,y);
    mostrarGuia();
   console.log("entra");
  }
}

//se agrega la funcionalidades del click del mouse sobre el canvas
canvas.onmousedown = function(e){
  if (canGetFicha(jugadorActual.getNombre(),(e.clientX-canvas.getBoundingClientRect().left),(e.clientY - canvas.getBoundingClientRect().top))) {
    clicked = true;
    fichaActual = jugadorActual.getFicha();
  }
  
}

//se aplica la animación de las fichas al tirarlas sobre el tablero
function caidaDeFicha(ficha, x, filaLlegada) {
  let y = 0;

  //dy: la aceleración de la caida de la ficha
  let dy = 8;


  //se encarga de dibujar, borrar y re dibujar el canvas, teniendo en cuenta el cambio en la y de la ficha al caer
  function animar() {
      let alturaLlegada = (tablero.rectHeight + (ficha.radio/2)) - (filaLlegada * (ficha.radio*2))-(tablero.cellHeight-ficha.radio);
      let columna=0;
      let j=0;
      while(columna<tablero.getColumnas()-1 && !(x>tablero.getPaddingX()+j*tablero.getCellWidth() && x<=tablero.getPaddingX()+(j+1)*tablero.getCellWidth())){
        columna++;
        j++;
      }

      x=tablero.getX(columna, 2);
      console.log(x);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tablero.dibujar();

      if (y < alturaLlegada) {
          ficha.dibujar(ctx, x, y); 
          y += dy;
          requestAnimationFrame(animar);
      } else {
          ficha.dibujar(ctx, x, alturaLlegada);
      }

      tablero.dibujarPila(j1, j2, cantFichasGan);
    
  }

  animar();
}


//se agrega la funcionalidades al soltar el click del mouse sobre el canvas
canvas.onmouseup = function(e){
  
  if(clicked){
    //pedimos la fila de llegada usando la posicion del mouse
    let filaLlegada=tablero.obtenerFilaDeLlegada(e.clientX-canvas.getBoundingClientRect().left);
    if(filaLlegada!=-1){
      //luego de verificar que sea una fila valida iniciamos la animacion
      caidaDeFicha(fichaActual,  e.clientX-canvas.getBoundingClientRect().left, filaLlegada);
    }else{
      fichaActual.borrar(ctx, (e.clientX - canvas.getBoundingClientRect().left), (e.clientY-canvas.getBoundingClientRect().top));
    }

    //ejecutamos esta funcion luego de un tiempo maximo de espera a la animación
    setTimeout(() => {
      if (tablero.add((e.clientX - canvas.getBoundingClientRect().left), (e.clientY-canvas.getBoundingClientRect().top), fichaActual)) {   
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //se indica que el click se soltó
        clicked = false;
        let ganador = tablero.gane(fichaActual,e.clientX - canvas.getBoundingClientRect().left );

        //ganador.legnth representa el tamaño del arreglo con las fichas ganadoras, o uno vacio
        if (ganador.length == cantFichasGan){
          for (let i = 0; i < ganador.length; i++) {
            //destaca las fichas ganadoras, una por una
            ganador[i].ganadora();
          }

          mostrarGanador(fichaActual.jugador);
          setTimeout(() => {          
            ocultarControles();
          }, 1000);
        }

        //se define que no hay ficha actual
        fichaActual = null;

        //se intercambia el turno del usuario
        indiceJugador = (indiceJugador + 1) % 2;
        jugadorActual = indiceJugador === 0 ? j1 : j2;

        //se intercambia la pista visual del turno de los jugadores (la sombra sobre el nombre del jugador)
        document.querySelectorAll(".jugador").forEach(e=> {
          if(e.innerText==jugadorActual.getNombre()){
            e.classList.add("selected");
          }
          if(e.innerText!=jugadorActual.getNombre()&&e.classList.contains("selected")){
            e.classList.remove("selected");
          }
        })
      }
    }, 2000-(2000/tablero.filas)*filaLlegada);

    //se redibujan los elementos del canvas
    setTimeout(()=>{
       ctx.clearRect(0, 0, canvas.width, canvas.height);
      tablero.dibujar();
      tablero.dibujarPila(j1, j2, cantFichasGan);
    }, 2000-(2000/tablero.filas)*filaLlegada);

    //se indica que se soltó el click aunque no se haya insertado la ficha (aunque sin cambiar el turno)
    clicked=false;
  }
}


//verificamos que el jugador haga click en la ficha correspondiente teniendo en cuenta la posicion en x y en y
function canGetFicha(jugador,x,y){
  if (jugador == 'Jugador 1') {
    if (x<200&&y<800) {
      return true;
    }else{
      console.log("aca no se puede");
      return false;
    }
  }else if (jugador == 'Jugador 2') {
    if (x>800&&y<800) {
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
  
}


//se encarga de establecer los datos del menu de juego terminado (cuando un jugador gana) y, ademas mostrar el menu
function mostrarGanador(ganador){
  setTimeout(() => {
    document.getElementById("ganador").innerText=ganador;
    mostrarMenu("final");
    containerMenu.style.opacity="1";
    containerMenu.style.display="flex";
    containerMenu.style.visibility="visible";
  }, 1000);
}


//inicia el juego determinado el modo de juego y los avatares de los jugadores
function iniciarJuego(tipo, avatar1, avatar2){
  clicked = false;
  cantFichasGan=tipo;
  tablero= new Tablero(canvas,ctx,cantFichasGan);
  j1 = new Jugador('Jugador 1', avatar1, cantFichasGan);
  j2 = new Jugador('Jugador 2', avatar2, cantFichasGan);

  //se establece al j1 como primero en turno
  jugadorActual = j1;

  fichaActual="";

  tablero.dibujarPila(j1, j2, tipo);

  //mostramos los controles de juego (replay, nombres y timer)
  controlesJuego.forEach(e=> {
    e.style.display="flex";
    e.style.opacity="1";
    e.style.visibility="visible";
  })

  setTimeout(function(){ pintarJugadores(); }, 400);

  document.getElementById("jugador1").classList.add("selected");

  tiempo=tiempoInicial;
  console.log(tiempo);

  //inicia el timer del juego
  temporizador = setInterval(() => {
    //si se termina el tiempo, se ejecuta la funcion de empate y se reinicia el texto del timer
    if (tiempo == 0) {
      clearInterval(temporizador);
      setTimeout(() => {
        empate();
        temporizadorUi.innerText = tiempoInicial + "s";
      }, 1000);
    }
    temporizadorUi.innerText = tiempo + "s";
    tiempo--;
  }, 1000);
}


//se encarga de establecer los datos del menu de juego terminado (cuando el tiempo termian) y, ademas muestra el menu
function empate(){
  ocultarControles();
  containerMenu.style.opacity="1";
  containerMenu.style.display="flex";
  containerMenu.style.visibility="visible";

  mostrarMenu("empate");
}

//oculta el timer, el boton de replay y los nombres de jugador
function ocultarControles(){
  controlesJuego.forEach(e=> {
    e.style.display="none";
    e.style.opacity="0";
    e.style.visibility="hidden";
  })
}


//se encarga de mostrar un menú de juego especificado a través de un id pasado por parámetro
function mostrarMenu(menu){
  menu=document.getElementById(menu);
  menu.style.opacity="1";
  menu.style.display="flex";
  menu.style.visibility="visible";
}

//oculta un menú de juego, especificando un id por parámetro
function ocultarMenu(menu){
  menu=document.getElementById(menu);
  menu.style.opacity="0";
  menu.style.display="none";
  menu.style.visibility="hidden";
}


//pinta la fichas de los jugadores
function pintarJugadores(){
  j1.pintar(jugadorActual.getNombre());
  j2.pintar(jugadorActual.getNombre());
}


//muestra las guias visuales de donde insertar las fichas
function mostrarGuia(){
  tablero.mostrarGuia();
}

//verifica que tipo de juego se jugará e inicia el juego dependiendo de la decisión
function IniciarJuegoPorTipo(j1Avatar, j2Avatar, modo){
  if(modo=="4enlinea"){
    tiempoInicial=120;
    iniciarJuego(4, j1Avatar, j2Avatar);
  } else if(modo=="5enlinea"){
    tiempoInicial=180;
    iniciarJuego(5, j1Avatar, j2Avatar);
  } else if(modo=="6enlinea"){
    tiempoInicial=240;
    iniciarJuego(6, j1Avatar, j2Avatar);
  }else if(modo=="7enlinea"){
    tiempoInicial=360;
    iniciarJuego(7, j1Avatar, j2Avatar);
  }
}