//Se llama cada vez que el input text cambia
function actualizarContador() {
    let input = document.querySelector("#comentario"); //Input text
    let maxLength = input.maxLength;    //Limite de caracteres
    let currentLength = input.value.length;     //Cantidad de caracteres escritos hasta ahora

    let contador = document.querySelector("#contador-caracteres");  //Contador
    contador.textContent = (maxLength - currentLength) + " caracteres restantes";   //Al limite, le resto la cantidad actual
}