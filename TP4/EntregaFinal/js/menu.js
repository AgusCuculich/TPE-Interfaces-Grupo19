//Javascript para el sitio.

document.addEventListener("DOMContentLoaded", control_menu);


function control_menu(){
    let boton_menu = document.querySelector("#btn_hamburguesa");
    boton_menu.addEventListener("click", toggle_menu);

    let boton_lupa = document.querySelector("#btn_search");
    boton_lupa.addEventListener("click", ()=>{
        toggle_menu();
        //Focusear la barra de busqueda (solo si se llama desde la lupa)
        document.querySelector(".search-mobile").focus();
    });




    let boton_compartir = document.querySelector("#btn-compartir");

    if (boton_compartir){
        boton_compartir.addEventListener("click", toggle_compartir);
    };



}


function toggle_compartir(){
    let barraRedes = document.querySelector("#barra-compartir");
    barraRedes.classList.toggle("oculto-compartir");
}


function toggle_menu(){
    let menu = document.querySelector(".menu_hamburguesa");
    menu.classList.toggle("oculto");

    let icono_menu = document.querySelector("#btn_hamburguesa");
    icono_menu.classList.toggle("espejeado");


    //Solo en mobile, al abrir el menu hamburguesa, se oscurece el resto de la pagina
    if (!window.matchMedia("(min-width: 1024px)").matches) {
        document.querySelector("main").classList.toggle("semitransparente");
    }




    //Se asegura que el oscurecimiento o aclaramiento se mantenga cuando el tamaño de la pantalla
    //Cambie durante la ejecucion.
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const chequearTamanioPantalla = (e) => {
        let menu = document.querySelector(".menu_hamburguesa");

        //Si es Desktop y el menu esta esconcido, se aclara
        if (e.matches && !menu.classList.contains("oculto")) {
            document.querySelector("main").classList.remove("semitransparente");
        }

        //Si es mobile y el menu esta presente, se oscurece
        if (!e.matches && !menu.classList.contains("oculto")){
            document.querySelector("main").classList.add("semitransparente");
        }

    };

    mediaQuery.addEventListener("change", chequearTamanioPantalla);


    // if (window.matchMedia("(min-width: 1024px)").matches){
    //     document.querySelector("main").classList.remove("semitransparente");
    // }


}