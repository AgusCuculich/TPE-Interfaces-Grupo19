//Javascript para el sitio.

document.addEventListener("DOMContentLoaded", control_menu);


function control_menu(){
    let boton_menu = document.querySelector("#btn_hamburguesa");
    boton_menu.addEventListener("click", toggle_menu);
}


function toggle_menu(){
    let menu = document.querySelector(".menu_hamburguesa");
    menu.classList.toggle("oculto");
}