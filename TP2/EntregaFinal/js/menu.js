//Javascript para el sitio.

document.addEventListener("DOMContentLoaded", control_menu);


function control_menu(){
    let boton_menu = document.querySelector("#btn_hamburguesa");
    boton_menu.addEventListener("click", toggle_menu);

    let boton_compartir = document.querySelector("#btn-compartir");
    boton_compartir.addEventListener("click", toggle_compartir);


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
}