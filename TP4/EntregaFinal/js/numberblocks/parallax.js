document.addEventListener("DOMContentLoaded", gestionarParallax);

function gestionarParallax(){

    function parallax_vertical(){


        //Obtengo todos los elementos a los cuales les voy a aplicar parallax vertical
        const elementosParallax = document.querySelectorAll(".parallax-v");

        //Recorro todos los elementos para aplicarles el efecto
        elementosParallax.forEach(elemento =>{
            const speed = parseFloat(elemento.getAttribute('data-speed'));  //Obtengo la velocidad

                let yPos = window.scrollY * speed / 100;    //Calculo su desplazamiento
                elemento.style.transform = `translateY(${yPos}px)`; //Lo desplazo usando translateY

        })



    }


    //Esta funcion hace que el logo se vaya achicando a medida que se scrollea. Una vez que el mismo es muy pequeño,
    //se ancla a la pantalla y pasa a formar parte del header
    function parallax_escalado(){
        const logo = document.querySelector("#nb-logo");    //Traigo el logo


        //Definimos escala minima y maxima, asi como la cantidad de pixeles que hay que scrollear para alcanzarlas
        const maxScroll = 300;
        const minScale = 0.268;
        const maxScale = 1;

        //Nuestra escala es entre 0 y 1, asi que calculamos la escala a aplicar
        const scrollPos = Math.min(window.scrollY, maxScroll);
        const scale = maxScale - (scrollPos / maxScroll) * (maxScale - minScale);

        // Le aplicamos la escala al logo
        logo.style.transform = `scale(${scale})`;
        logo.style.top = "0px";

        // Si el logo alcanzó su escala minima, entonces se ancla a la pantalla
        if (scale <= minScale) {
            logo.style.position = "fixed"; // Lo hacemos fixed para que se quede pegado
            logo.style.top = "-100px"; // Lo fijamos a la parte superior

            const leftPosition = (window.innerWidth - logo.offsetWidth) / 2;
            logo.style.left = leftPosition + "px"; // Lo centramos horizontalmente
        } else {
        //Si no alcanzamos la escala minima, queda centrado y se sigue reescalando
            logo.style.position = "absolute";
            logo.style.top = (6 + scrollY/1.5) + "px"; // Lo movemos con el scroll
            logo.style.left = 360 + "px"; // Lo centramos horizontalmente
        }
    }



    //Esta funcion mueve la imagen de la seccion 3, en direccion opuesta al mouse.
    function imagenMouse(e){
        const imagen = document.querySelector("#bg3-chars");

        //Primero, obtengo las coordenadas del mouse
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        //Luego, las coordenadas del centro de la pantalla
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        //Ahora podemos calcular la distancia entre el mouse y el centro
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        //Por ultimo, usamos esa diferencia para mover la imagen
        imagen.style.transform = `scale(${1.2}) translate(${ -deltaX * 0.1 }px, ${ -deltaY * 0.1 }px)`;
    }



    let lastSrc = null; // Variable para almacenar la última fuente cambiada

    function sec4Img(){

    }


    function changeSrc(img, newSrc) {
        img.style.transition = "opacity 0.2s ease";
        img.style.opacity = "0";


        setTimeout(() => {
            img.src = newSrc;
            img.style.transition = "opacity 0.2s ease";
                img.style.opacity = "1";
        }, 250);
        // img.src = newSrc;
    }



    function toggle_menu(){
        const btn = document.querySelector("#btn-menu");
        btn.classList.toggle("activo");
    }




    document.querySelector("#btn-menu").addEventListener("click",toggle_menu);


    //Llamo a la funcion cada vez que detecta que estoy scrolleando
    window.addEventListener('scroll', parallax_vertical);
    window.addEventListener('scroll', parallax_escalado);
    window.addEventListener("mousemove", imagenMouse);
    window.addEventListener('scroll', sec4Img);















}