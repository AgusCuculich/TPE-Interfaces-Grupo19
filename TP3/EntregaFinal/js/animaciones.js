document.addEventListener("DOMContentLoaded", animar);


function animar(){


    //FUNCION DEL CARRUSEL


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



    //FUNCIONALIDAD DE AÑADIR AL CARRITO



    //Consigo todos los botones de añadir al carrito
    let botonesCarrito = document.querySelectorAll(".btn-carrito");

    document.querySelector(".carrito-circulo").textContent = Number(document.querySelectorAll(".en-carrito").length);

    //A cada boton le asigno el evento de comprar cuando se clickea
    botonesCarrito.forEach(boton =>{
        boton.addEventListener("click", ()=>{
            aniadirCarrito(boton);
        })
    });



    //Cambia la apariencia de la card afectada y dispara una animacion en el carrito de compras
    function aniadirCarrito(botonActivador){

        //Cambiar el estilo de la card
        botonActivador.parentElement.classList.add("en-carrito");

        //TODO Animar carrito
        let cantidadCompras = document.querySelector(".carrito-circulo");
        cantidadCompras.textContent = Number(cantidadCompras.textContent) + 1;

        let pulso = document.createElement("div");
        pulso.classList.add("circulo-pulsante");
        document.querySelector(".cont-carrito").appendChild(pulso);

        setTimeout(()=>{
            pulso.remove();
        }, 1000)

    }









    //Recibe el boton que lo llamó y la direccion a la que se animará
    // 0 = izquierda
    // 1 = derecha
    function animarCarrusel(boton, direccion){
        console.log(direccion);

        const carrusel = boton.parentElement.querySelector('.carrusel');

        /* lógica para desplazar las cards*/
        const anchoWrapper = document.querySelector(".carrusel-wrapper").offsetWidth - 48 * 2; // Resta el ancho de los botones
        let anchoTarjeta = 200; // Ancho de cada tarjeta
        let gap = 30; // Espacio entre tarjetas
        
        // Calcular cuántas tarjetas caben en el ancho del wrapper
        let cantCards = Math.floor((anchoWrapper + gap) / (anchoTarjeta + gap)); // Usa floor para evitar problemas

        let desplazamiento = cantCards * 200 + (cantCards * 30);

        //Scrollea el div del carrousel a la direccion indicada
        //carrusel.scrollLeft += direccion * anchoWrapper;
        carrusel.scrollLeft += direccion * desplazamiento;

        const cards = carrusel.querySelectorAll('buy-card, free-card, carrito-card');

        if (direccion == 1) { // Cambiar a la izquierda
            cards.forEach(card => {
                card.classList.add("carrusel-izq");
                setTimeout(() => {
                    card.classList.remove("carrusel-izq");
                }, 500);
            });
        } else { // Cambiar a la derecha
            cards.forEach(card => {
                card.classList.add("carrusel-der");
                setTimeout(() => {
                    card.classList.remove("carrusel-der");
                }, 500);
            });
        }
    }





    //FUNCIONALIDAD DE CLICKEAR BTN JUGAR (JUEGO)


    const btnGame = document.querySelector("#btn-game");
    const gameImg = document.querySelector("#img-game");


    if(btnGame && gameImg) {btnGame.addEventListener("click", () => {gameImg.classList.remove("img-opaca"); btnGame.classList.add("ocultar")})}





}