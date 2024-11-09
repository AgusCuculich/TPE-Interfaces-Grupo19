document.addEventListener("DOMContentLoaded", loading);


function loading(){

    let porcentaje = document.querySelector("#porcentaje-carga");
    incrementarHasta100(porcentaje);

}


function incrementarHasta100(porcentaje) {
    let valor = 0;

    const interval = setInterval(() => {
        if (valor >= 100) {
            clearInterval(interval);
            document.querySelector(".seccion-carga").classList.add("desaparecer");

            setTimeout(()=>{
                document.querySelector(".seccion-carga").remove();
            },200);




        } else {
            valor += 0.1;
            porcentaje.textContent = valor.toFixed(0) + '%';
        }
    }, 1); //



}


