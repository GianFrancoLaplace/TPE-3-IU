class Jugador {
    constructor(jugador, imagen, modo) {
      this.canvas = document.getElementById('canvas');
      this.ctx = canvas.getContext('2d');
      this.jugador = jugador;
      this.fichas = [];
      this.posPiloteY = 200;
      this.avatar=imagen;
      this.posPiloteX=this.setPosX(jugador);
      this.startGame(modo);
    }
  
    //
    startGame(modo){
      for (var i = 0; i < 32; i++) {
        var ficha = new Ficha(this.jugador, modo, this.avatar);
        this.fichas.push(ficha);
        ficha.dibujar(ctx,this.posPiloteX,this.posPiloteY-i, modo, this.avatar);
      }
    }
  
    //se retornan la cantidad de fichas insertadas
    getCantFichas(){
      return this.fichas.length-1;
    }
  
    //se borra la ultima ficha
    getFicha(){
      if (this.fichas.length>-1) {
        return this.fichas.pop();
      }
    }
  
    //retorna el nombre del jugador
    getNombre(){
      return this.jugador;
    }
  
    //dibuja las fichas que se usan para jugar
    pintar(jugadorActual){
      var cant = 0;
      if (this.jugador == jugadorActual) {
        cant = this.fichas.length-1;
      }else{
        cant = this.fichas.length;
      }
  
      for (var i = 0; i < cant; i++) {
        this.fichas[i].dibujar(this.ctx,this.posPiloteX,this.posPiloteY);
      }
    }
  
    //determina en que posicion se encuentran las fichas de cada jugador
    setPosX(jugador){
      if (jugador == 'Jugador 1') {
        return 110;
      }else {
        return this.canvas.width-110;
      }
    }
  
    
  }
  