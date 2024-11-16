class Ficha {
    constructor(jugador, modoJuego, imagen) {
      this.canvas = document.getElementById('canvas');
      this.ctx = canvas.getContext('2d');
      this.jugador = jugador;
      this.radio=this.setRadio(modoJuego);
      this.ruta=this.setRuta(imagen);
      this.color = "#A8D8B9";
    }
  
    //dibuja la ficha
    dibujar(ctx,posX,posY){
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#003366';
      ctx.stroke();
      if (this.ruta!="") {
        var img = new Image();
        img.src = this.ruta;
        ctx.drawImage(img,posX-this.radio,posY-this.radio,this.radio*2,this.radio*2);
      }
    }
  
    //borra la ficha en el canvas
    borrar(ctx, posX, posY){
      ctx.clearRect(posX - this.radio, posY - this.radio, this.radio * 2, this.radio * 2);
    }
  
    getNombre(){
      return this.jugador;
    }
  
    //pinta la ficha de manera destacada, en el caso que sea ganadora
    ganadora(){
      this.ruta="";
      this.color = "rgb(204, 215, 4)";
    }
  
    //setea el radio dependiendo del modo de juego, asi se adapta al tamaño del tablero
    setRadio(modoJuego){
      let radio;
      switch(modoJuego){
        case 4:
          radio=40;
          break;
        case 5:
          radio=35;
          break;
        case 6:
          radio=30;
          break;
        case 7:
          radio=25;
          break;
        default: radio=40;
      }
      return radio;
    }
  
    //setea la ruta de la imagen de la ficha
    setRuta(imagen){
      if(imagen){
        return imagen;
      }else{
        return "";
      }
    }
  }
  