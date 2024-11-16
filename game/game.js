document.querySelectorAll(".opciones-juego div img").forEach(e=> {
    e.addEventListener('click', function(){
        let tipo;

        if(e.classList.contains("opcion-ficha")){
            if(e.classList.contains("jugador1")){
                tipo="jugador1";
            }else if(e.classList.contains("jugador2")){
                tipo="jugador2";
            }
        }else if(e.classList.contains("opcion-tablero")){
            tipo="opcion-tablero";
        }

        document.querySelectorAll(".opciones-juego div img").forEach(e=> {
            if(e.classList.contains(tipo)){
                e.classList.remove("selected");
            }
        })
        e.classList.add("selected");
    })
});