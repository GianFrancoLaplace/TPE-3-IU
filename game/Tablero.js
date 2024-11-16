class Tablero {
    constructor(canvas, ctx, cantFichasGan) {
      this.cantFichasGan=cantFichasGan;
      this.canvas=canvas;
      this.ctx=ctx;
      this.filas=this.setFilas(cantFichasGan);
      this.columnas=this.setColumnas(cantFichasGan);
      this.tablero =  this.crearMatriz();
  
      //Alto y ancho del canvas
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      
      // Ajustamos el ancho y alto del rectángulo al 60% y 80% del tamaño del canvas, respectivamente
      this.rectWidth = 0.6 * this.canvasWidth;
      this.rectHeight = 0.8 *this.canvasHeight;
      
      // Calculamos el padding para centrar el rectángulo
      this.paddingX = (this.canvasWidth - this.rectWidth) / 2;
      this.paddingY = (this.canvasHeight - this.rectHeight) / 2;
      
      // Calculamos el ancho y alto de cada celda
      this.cellWidth = this.rectWidth / this.filas;
      this.cellHeight = this.rectHeight / this.columnas;
      
  
      //traemos la imagen de fondo del tablero, cuando cargue, se dibuja
      this.fondoCargado=false;
      this.fondo=new Image();
      this.fondo.src = "./fondo.jpg";
      this.fondo.onload=()=>{
        this.fondoCargado=true;
        this.dibujar();
      }
  
      this.startGame();
    }
  
    //se crea la matriz base, estructura que se utilizará para verificaciones e inserciones
    crearMatriz() {
      let matriz = [];
      for (let i = 0; i < this.filas+1; i++) {
          matriz[i] = [];
          for (let j = 0; j < this.columnas; j++) {
              matriz[i][j] ={
                "ficha": new Ficha('base', this.cantFichasGan, ""),
                "x":0,
                "y":0
              };
          }
      }
      return matriz;
    }
  
    //llena el tablero de las fichas "vacias"
    startGame() {
      for (let i = 0; i < this.filas; i++) {
        for (let j = 0; j < this.columnas; j++) {
          this.tablero[i][j].ficha = new Ficha('base', this.cantFichasGan, "");
        }
      }
      this.dibujar();
    }
  
    //dibujamos el tablero
    dibujar() {
      this.ctx.fillStyle = "rgb(54, 54, 54)";
      this.ctx.fillRect(this.paddingX, this.paddingY, this.rectWidth, this.rectHeight);
  
      //se verifica nuevamente si el fondo está cargado
      if(this.fondo.complete){
        this.ctx.drawImage(this.fondo,this.paddingX,this.paddingY,this.rectWidth,this.rectHeight);
      }
  
      for (let i = 0; i < this.filas; i++) {
        for (let j = 0; j < this.columnas; j++) {
          // Calculamos la posición de cada celda, centrando cada ficha dentro de su celda
          const x = this.paddingX + (this.cellWidth * i) + (this.cellWidth / 2);
          const y = this.paddingY + this.rectHeight - (this.cellHeight * j) - (this.cellHeight / 2);
          
          //dibujamos los espacios para las fichas
          this.tablero[i][j].ficha.dibujar(this.ctx, x, y);
          this.tablero[i][j].x=x;
          this.tablero[i][j].y=y; 
        }
      }
    }
  
    getX(fila, columna){
      return this.tablero[fila][columna].x;
    }
   
    //la funcion add se fija que la posicion donde queres soltar la ficha corresponda a una columna y a cual
    add(x, y,ficha){
  
      let columna=0;
      let j=0;
      while(columna<this.columnas-1 && !(x>this.paddingX+j*this.cellWidth && x<=this.paddingX+(j+1)*this.cellWidth)){
        columna++;
        j++;
      }
      
      
      for (let i = 0; i < this.tablero.length; i++) {
        if(columna==this.columnas-1){
          this.tablero[i][j].ficha.borrar(this.ctx, x, y);
        }else{
          if (this.tablero[columna][i].ficha.getNombre() == 'base') {
            this.tablero[columna][i].ficha = ficha;
            return true;
          }
        }
      }
      return false;
    }
     
    getColumnas(){
      return this.columnas;
    }
    getPaddingX(){
      return this.paddingX;
    }
    getCellWidth(){
      return this.cellWidth;
    }
    // la funcion gane se encarga de la verificacion una vez que la ficha está posicionada
    gane(ultimo){
      var fichasGanadoras = [];
      var actual;
      var verticalActual;
      var horizontalActual;
  
      for (var i = 0; i < this.filas; i++) {
        for (var j = 0; j < this.columnas; j++) {
  
          // si estoy parado en una ficha del tipo q quiero buscar
          if (ultimo.getNombre() == this.tablero[i][j].ficha.getNombre()) { 
  
            // validacion vertical
            actual = this.tablero[i][j].ficha;
            fichasGanadoras.push(actual);
            verticalActual = j;
  
            if ((verticalActual+1) < this.filas) {
              while(actual.getNombre()==this.tablero[i][verticalActual+1].ficha.getNombre()){
                verticalActual++;
                fichasGanadoras.push(this.tablero[i][verticalActual].ficha);
                if (fichasGanadoras.length == this.cantFichasGan) {
                  return fichasGanadoras;
                }
                actual = this.tablero[i][verticalActual].ficha;
              }
            }
            fichasGanadoras = [];
            //no encontro nada verticalmente
  
            //validacion horizontal
            actual = this.tablero[i][j].ficha;
            fichasGanadoras.push(actual);
            horizontalActual = i;
            fichasGanadoras=this.validacionHorizontal(horizontalActual, actual, j, fichasGanadoras);
            if(fichasGanadoras.length==this.cantFichasGan){
              return fichasGanadoras;
            }
         
            fichasGanadoras = [];
            //no encontro nada horizontalmente
  
  
            //validacion diagonal arriba
            actual = this.tablero[i][j].ficha;
            fichasGanadoras.push(actual);
            horizontalActual = i;
            verticalActual = j;
            fichasGanadoras=this.validacionDiagonalArriba(horizontalActual, verticalActual, actual, fichasGanadoras);
            if(fichasGanadoras.length==this.cantFichasGan){
              return fichasGanadoras;
            }
         
            fichasGanadoras = [];
            //no encontro nada en diagonal arriba
  
            //validacion diagonal abajo
            actual = this.tablero[i][j].ficha;
            fichasGanadoras.push(actual);
            horizontalActual = i;
            verticalActual = j;
  
            while((((horizontalActual+1) < this.columnas-1) && ((verticalActual-1) > -1)) && actual.getNombre()==this.tablero[horizontalActual+1][verticalActual-1].ficha.getNombre()){
              horizontalActual++;
              verticalActual--;
              fichasGanadoras.push(this.tablero[horizontalActual][verticalActual].ficha);
              if (fichasGanadoras.length == this.cantFichasGan) {
                return fichasGanadoras;
              }
              actual = this.tablero[horizontalActual][verticalActual].ficha;
            }
            fichasGanadoras = [];
            //no encontro nada en diagonal arriba
  
          }
        }
      }
      return fichasGanadoras;
    }
  
    //verifica si las fichas acumuladas, horizontalmente, son de la cantidad de fichas para ganar
    validacionHorizontal(horizontalActual, actual, j, fichasGanadoras){
      
      while(((horizontalActual+1) < this.columnas-1) && actual.getNombre()==this.tablero[horizontalActual+1][j].ficha.getNombre()){
        horizontalActual++;
        fichasGanadoras.push(this.tablero[horizontalActual][j].ficha);
        if (fichasGanadoras.length == this.cantFichasGan) {
          return fichasGanadoras;
        }
        actual = this.tablero[horizontalActual][j].ficha; 
      }
      return fichasGanadoras;
    }
  
      //verifica si las fichas acumuladas, vertical y diagonal hacia arriba, son de la cantidad de fichas para ganar
    validacionDiagonalArriba(horizontalActual, verticalActual, actual, fichasGanadoras){
      while((((horizontalActual+1) < this.columnas-1) && ((verticalActual+1) < this.filas))&& actual.getNombre()==this.tablero[horizontalActual+1][verticalActual+1].ficha.getNombre()){
        //se mueve una ficha adelante y, una ficha arriba
        horizontalActual++;
        verticalActual++;
        fichasGanadoras.push(this.tablero[horizontalActual][verticalActual].ficha);
        if (fichasGanadoras.length == this.cantFichasGan) {
          return fichasGanadoras;
        }
        actual = this.tablero[horizontalActual][verticalActual].ficha;
      }
      return fichasGanadoras;
    }
  
    //verifica sobre que conjunto de fichas se soltó la del jugador
    obtenerFilaDeLlegada(x){
  
      let columna=0;
      let j=0;
      while(columna<this.columnas-1 && !(x>this.paddingX+j*this.cellWidth && x<=this.paddingX+(j+1)*this.cellWidth)){
        columna++;
        j++;
      }
      
      //comprobamos que el lugar esté vacío
      if(columna!=this.columnas-1){
        for (let u = 0; u < this.tablero.length; u++) {
          if (this.tablero[columna][u].ficha.getNombre() == 'base') {
            return u;
          }
        }
      }
      return -1;
    }
  
    //dibuja la pila de fichas de cada jugador
    dibujarPila(j1, j2, modo){
      //sobre que lado se dibujarán, dependiendo el juegador
      let j1x=110;
      let j2x=this.canvasWidth-110;
  
      //hasta donde llegarán las fichas
      let y=600;
  
      for(let i=0; i<=20; i++){
        //por cada ficha dibujada, se dibuja otra, un poco mas arriba
        y-=20;
        new Ficha(j1, modo, j1.avatar).dibujar(this.ctx, j1x, y)
        new Ficha(j2, modo, j2.avatar).dibujar(this.ctx, j2x, y);
      }
    }
  
  
    //muestra las guias visuales para insertar una ficha
    mostrarGuia() {
      for (let columna = 0; columna < this.columnas-1; columna++) {
  
        //determina la posicion donde estara la guia
        let x = this.paddingX + columna * this.cellWidth + this.cellWidth / 2; 
        let y = 40; 
  
        //se dibuja la guia, simulando una sombra
        let gradient = this.ctx.createRadialGradient(x, y, 5, x, y, this.cellWidth / 2);
        gradient.addColorStop(0, 'rgba(255, 70, 65, 0.9)'); 
        gradient.addColorStop(1, 'rgba(255, 70, 65, 0)'); 
  
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.cellWidth / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  
  
    //dependiendo el modo, determina cuantas filas se usarán para el tablero
    setFilas(modo){
      let filas;
  
      switch(modo){
        case 5: 
          filas=7;
          break;
        case 6:
          filas=8;
          break;
        case 7:
          filas=9;
          break;
        default:
          filas=6
      }
  
      return filas
    }
  
  
    //dependiendo el modo, determina cuantas columnas se usarán para el tablero
    setColumnas(modo){
      let columnas;
  
      switch(modo){
        case 5: 
          columnas=8;
          break;
        case 6:
          columnas=9;
          break;
        case 7:
          columnas=10;
          break;
        default:
          columnas=7
      }
      return columnas
    }
  
  }