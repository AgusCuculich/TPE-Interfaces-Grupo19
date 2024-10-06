document.addEventListener("DOMContentLoaded", animar);


function animar(){


    //Me traigo todos los botones de los carruseles
    let botones = document.querySelectorAll(".btn-carrusel");
    console.log(botones);

    let dir = 0;

    //A cada boton, se le asigna un evento dependiendo si es para retrodecer o avanzar.
    botones.forEach(boton =>{
        console.log("Asignado evento al boton: " + boton);


        //Segun si el boton es espejeado (izquierda) o no espejeado (derecha), defino la direccion
        //hacia la que hay que animar
        boton.addEventListener("click", (event)=>{
            event.preventDefault();
            let dir = boton.classList.contains("espejeado") ? -1 : 1;
            animarCarrusel(boton, dir);
        })




    })



    //Recibe el boton que lo llamó y la direccion a la que se animará
    // 0 = izquierda
    // 1 = derecha
    function animarCarrusel(boton, direccion){
        console.log(direccion);

        //Consigo el abuelo del boton, // boton -> etiqueta a -> carrusel
        let padre = boton.parentElement.parentElement;


        //Scrollea el div del carrousel 700px, a la direccion indicada
        padre.scrollLeft += direccion * 700;


        //Segun la direccion, asigno la clase que anima al elemento, y a los 500ms la quito
        if (direccion == 1){
            padre.classList.add("carrusel-izq");
            setTimeout(()=>{
                padre.classList.remove("carrusel-izq");
            }, 500)
        }
        else{
            padre.classList.add("carrusel-der");
            setTimeout(()=>{
                padre.classList.remove("carrusel-der");
            }, 500)
        }




    }
















}