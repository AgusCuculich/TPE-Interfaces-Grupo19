//Este es el div render-juego
let gameRender = document.querySelector(".render-juego");

//Boton de 4 en linea
document.querySelector("#btn-4-en-linea").addEventListener("click", ()=>{
    newGame(5,6)
});

//Boton de 5 en linea
document.querySelector("#btn-5-en-linea").addEventListener("click", ()=>{
    newGame(7,8)
});

//Boton de 6 en linea
document.querySelector("#btn-6-en-linea").addEventListener("click", ()=>{
    newGame(8,9)
});


//Crea el elemento canvas, instancia el juego y lo inicia con los parametros ingresados en el menu
function newGame(rows,columns){
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 1472;
    canvas.height = 720;
    canvas.style.border = '1px solid black';

    gameRender.innerHTML = "";
    gameRender.appendChild(canvas);

    let juego = new Game();
    juego.start(rows,columns);
}








//let juego = new Game(9, 10);

// 4 en linea 6x7
// 5 en linea 7x8
// 6 en linea 8x9
// 7 en linea 9x10
// --> 7 filas es el max.

