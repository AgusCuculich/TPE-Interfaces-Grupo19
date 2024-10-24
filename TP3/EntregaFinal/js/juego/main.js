let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let canvasWidth= canvas.width;
let canvasHeight = canvas.height;


const CANT_FIG = 30;


let figures = [];   //Lista de todas las figuras dibujadas
let lastClickedFigure = null;   //Figura mas recientemente clickeada
let isMouseDown = false;    //Esta el mouse siendo presionado?



//Dibuja un cuadrado o circulo, con 50% de probabilidad
function addFigure(){
    if (Math.random() > 0.5){
        addRect();
    }
    else{
        addCircle();
    }

    drawFigure();
}


//Agrega un nuevo rectangulo en una posicion random, con atributos random
function addRect(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let width = Math.round(Math.random() * canvasWidth/4);
    let height = Math.round(Math.random() * canvasHeight/4);


    let rect = new Rect(posX, posY, width,height, color,ctx, true);
    figures.push(rect);
}


//Agrega un nuevo circulo en una posicion random, con atributos random
function addCircle(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let radius = Math.round(Math.random() * 50);


    let circle = new Circle(posX,posY, radius, color, ctx, true);
    figures.push(circle);

}

//Recorro todas las figuras, y donde encuentra una clickeada la devuelvo
function findClickedFigure(x,y){
    for (let i = 0; i < figures.length; i++){
        const element = figures[i];
        if (element.isPointInside(x,y)){
            return element;
        }


    }
}


//Genera un nuevo fotograma, limpia la pantalla y dibuja todas las figuras de la lista
function drawFigure(){
    clearCanvas();
    for (let i = 0; i < figures.length; i++){
        figures[i].draw();  //Aprovecha binding dinamico para dibujar cualquier figura
    }
}


//Crea un rectangulo blanco que ocupa toda la pantalla (usado para limpiar el canvas)
function clearCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}


//Genera un color RGBA random (opacidad siempre al maximo)
function randomRGBA(){
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;

    return "rgba("+r+','+g+','+b+','+a+')';

}



//Estados del mouse



//Cuando presiono el click del mouse
function onMouseDown(e){
    isMouseDown = true;

    //Quita el resultado de la ultima figura resaltada
    if (lastClickedFigure !=null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }

    //Encuentra la figura clickeada (si la hay) y la resalta
    let clickFig = findClickedFigure(e.layerX,e.layerY);
    if (clickFig != null && clickFig.isDraggable()){
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    drawFigure(); //Refresca la pantalla, creando un nuevo frame



}



//Cuando el mouse se esta moviendo
//En cada frame, mientras mantenga el mouse apretado, actualizo la posicion y refresco la pantalla
function onMouseMove(e){
    if (isMouseDown && lastClickedFigure != null && lastClickedFigure.isDraggable()){
        lastClickedFigure.setPosition(e.layerX,e.layerY);
        drawFigure();
    }
}



//Cuando levanto el mouse, seteo como false
function onMouseUp(e){
    isMouseDown = false;

    if (lastClickedFigure != null){
        lastClickedFigure.setResaltado(false);




        for (let figure of figures) {
            if (figure !== lastClickedFigure && figure.isInside(lastClickedFigure)) {
                console.log("Figura soltada dentro de otra figura");
                lastClickedFigure.descendTo(700,5);
                lastClickedFigure.setDraggableState(false);
            }
        }
    }
    drawFigure();
}







//Agregar los eventos que escuchan al mouse
canvas.addEventListener('mousedown' , onMouseDown, false);  //Cuando presiono el mouse
canvas.addEventListener('mouseup' , onMouseUp, false);  //Cuando suelto el mouse
canvas.addEventListener('mousemove' , onMouseMove, false);  //Cuando muevo el mouse





// let rect = new Rect(10, 700, 1580,100, randomRGBA(),ctx, false);
// figures.push(rect);
// //
// //
// //
// // Agrego figuras para probar
// for (let i = 0; i < 10; i++){
//     addFigure();
// }



// for (let i = 0; i < 10; i++){
//    for (let j = 0; j < 5; j++){
//        let posX = i*10 * 15 + 100;
//        let posY =  100 + j*15*10;
//        let color = randomRGBA();
//        let radius = 50;
//
//
//        let circle = new Circle(posX,posY, radius, color, ctx);
//        figures.push(circle);
//        drawFigure();
//    }
// }
//


//Dimensiones y declaracion de la matriz de juego

const filas =5;
const columnas = 6;
let matriz = [];



// Relleno la matriz con circulos
for (let i = 0; i < filas; i++) {
    const fila = []; // Crear fila
    for (let j = 0; j < columnas; j++) {
        let posX = j*12 * 15 + 100;
        let posY =  100 + i*15*10;
        let color = randomRGBA();
        let radius = 50;


        let circle = new Circle(posX,posY, radius, color, ctx,false);
        fila.push (circle);
        figures.push(circle);

    }
    matriz.push(fila); // Agregar la fila creada a la matriz
}
drawFigure();

console.log("Matriz de juego");
console.table(matriz);

console.log("Ejemplo de acceso a la matriz");
console.log(matriz[0][0]);
