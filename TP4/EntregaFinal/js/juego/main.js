// Este script controla el menu principal. Permite a los jugadores elegir una apariencia para sus fichas, asi como
// el tamaño del tablero a usar. Se encarga de crear el juego, con dichas configuraciones.

//let juego = new Game();
//Este es el div render-juego
let gameRender = document.querySelector(".render-juego");
let p1_path = "./img/ficha-rojo.png";
let p2_path = "./img/ficha-marron.png";

const p1_1 = document.querySelector("#p1_1");
const p1_2 = document.querySelector("#p1_2");
const p1_3 = document.querySelector("#p1_3");
const p2_1 = document.querySelector("#p2_1");
const p2_2 = document.querySelector("#p2_2");
const p2_3 = document.querySelector("#p2_3");
p1_1.addEventListener("click", ()=>{p1_path = "./img/ficha-rojo.png"; pintarFicha(p1_1,".ficha-roja")});
p1_2.addEventListener("click", ()=>{p1_path = "./img/ficha-rojo2.png"; pintarFicha(p1_2,".ficha-roja")});
p1_3.addEventListener("click", ()=>{p1_path = "./img/ficha-rojo3.png"; pintarFicha(p1_3,".ficha-roja")});
p2_1.addEventListener("click", ()=>{p2_path = "./img/ficha-marron.png"; pintarFicha(p2_1,".ficha-marron")});
p2_2.addEventListener("click", ()=>{p2_path = "./img/ficha-marron2.png"; pintarFicha(p2_2,".ficha-marron")});
p2_3.addEventListener("click", ()=>{p2_path = "./img/ficha-marron3.png"; pintarFicha(p2_3,".ficha-marron")});


function pintarFicha(ficha, tipo){
    const botones = document.querySelectorAll(tipo);
    botones.forEach(boton => {boton.classList.remove("ficha-marcada")});
    ficha.classList.add("ficha-marcada");
}


//Boton de 4 en linea
document.querySelector("#btn-4-en-linea").addEventListener("click", ()=>{
    newGame(6,7,4,p1_path,p2_path)
});

//Boton de 5 en linea
document.querySelector("#btn-5-en-linea").addEventListener("click", ()=>{
    newGame(7,8,5,p1_path,p2_path)
});

//Boton de 6 en linea
document.querySelector("#btn-6-en-linea").addEventListener("click", ()=>{
    newGame(8,9,6,p1_path,p2_path)
});

//Boton de 7 en linea
document.querySelector("#btn-7-en-linea").addEventListener("click", ()=>{
    newGame(9,10,7,p1_path,p2_path)
});


//Crea el elemento canvas, instancia el juego y lo inicia con los parametros ingresados en el menu
function newGame(rows,columns, targetScore,p1_path,p2_path){
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 1479;
    canvas.height = 720;
    canvas.style.border = '1px solid black';

    gameRender.innerHTML = "";
    gameRender.appendChild(canvas);

    const timerText = document.createElement("h3");
    timerText.textContent = "200";
    timerText.classList.add("timer");
    gameRender.appendChild(timerText);

    let juego = new Game(targetScore,p1_path,p2_path);
    juego.start(rows,columns);
    console.log(p1_path);
    console.log(p2_path);
}








//let juego = new Game(9, 10);

// 4 en linea 6x7
// 5 en linea 7x8
// 6 en linea 8x9
// 7 en linea 9x10

//juego.start(9,10);
