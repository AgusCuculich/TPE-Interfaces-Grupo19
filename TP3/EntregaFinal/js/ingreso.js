document.addEventListener("DOMContentLoaded", ingresar);

function ingresar() {
    botones = document.querySelectorAll(".btn-ingreso");

    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {e.preventDefault(); window.location.href = 'index.html';})
    });
    //btns.addEventListener("click", (e) => {e.preventDefault(); window.location.href = 'index.html';});
}