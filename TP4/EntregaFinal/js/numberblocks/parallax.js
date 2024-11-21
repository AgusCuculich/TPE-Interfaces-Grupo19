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



    function toggle_menu(){
        const btn = document.querySelector("#btn-menu");
        btn.classList.toggle("activo");

        const menu = document.querySelector("#menu");
        menu.classList.toggle("activo");
    }





    //Imagen cambiante del televisor en seccion 2

    //Cada 5 segundos, cambia la ruta de la imagen, hay 4 posibles variantes

    const images = ['./img/numberblocks/sec2-tv.png', './img/numberblocks/sec2-tv-a1.png', './img/numberblocks/sec2-tv-a2.png','./img/numberblocks/sec2-tv-a3.png']; // Lista de rutas de las imágenes
    let currentIndex = 0;
    const fadeImage = document.querySelector("#sec2-tv");

    function changeImage() {
        //Hace fade out a la imagen actual, desvaneciendola
        fadeImage.classList.remove('active');

        //Cambia el source de la imagen y actualiza el indice de la img actual
        setTimeout(() => {

            currentIndex = (currentIndex + 1) % images.length;
            fadeImage.src = images[currentIndex];

            //Le agrego la clase active para que empiece a desvanecerse
            fadeImage.classList.add('active');
        }, 1000);
    }

        //Llama a la funcion cada 5 segundos
        setInterval(changeImage, 5000);




        // La imagen inicial tiene que comenzar con active para que sea visible (por default es invisible)
        fadeImage.classList.add('active');




    document.querySelector("#btn-menu").addEventListener("click",toggle_menu);



    //sec4 - CODIGO CONTENEDOR STICKY
    const stickyContainer = document.getElementById('sticky-container');
    //Div sticky que mostrará imagenes a medida que se scrolea.

    const options = {
        //configura los parámetros del observador
        root: null, // Usa el viewport como contenedor
        /**The element that is used as the viewport for checking visibility of the target. */
        rootMargin: '0px 0px -50% 0px', // Zona observada: desde el borde superior del viewport (0px) hasta la mitad de la pantalla.
        /**This set of values serves to grow or shrink each side of the root element's bounding box */
        threshold: 0.5 // El callback se ejecuta cuando el 70% del elemento es visible
    };

    function verificarVisibilidad(entries) {
        entries.forEach(entry => {
            // Para cada elemento observado (entries), verifica si está intersectando con el área visible.
            if (entry.isIntersecting) {
                stickyContainer.innerHTML = '';
                // Limpia el contenido del stickyContainer
                const clonedImage = entry.target.cloneNode(true);
                // Crear una copia de la imagen (para no modificar la original en sec4-images)
                stickyContainer.appendChild(clonedImage);
                // Añadir la imagen al contenedor sticky-container
            }
        });
    }

    const observer = new IntersectionObserver(verificarVisibilidad, options);
    // Se crea un nuevo observador que monitorea los elementos dados.

    let img = document.querySelectorAll('#sec4-images img');
    // Selecciona todas las imágenes dentro del contenedor con el ID sec4-images.

    img.forEach(image => observer.observe(image));
    // Itera sobre cada imagen y las observa individualmente.

    //sec4 ------------------------------------------------------------------------------------------------------------------

    //Llamo a la funcion cada vez que detecta que estoy scrolleando
    window.addEventListener('scroll', parallax_vertical);
    window.addEventListener('scroll', parallax_escalado);
    window.addEventListener("mousemove", imagenMouse);
















}