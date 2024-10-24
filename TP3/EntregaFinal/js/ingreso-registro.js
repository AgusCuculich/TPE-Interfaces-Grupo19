document.addEventListener("DOMContentLoaded", ingresarAnimado);

function ingresarAnimado() {
    botones = document.querySelectorAll(".btn-ingreso");

    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const form = document.querySelector(".contenedor-form");
            form.innerHTML = '';
            form.classList.add("form-inverso");


            const gato = `
.·´¯\`·.  ·´¯·.
|
| | ╲  ╲ ╲
|ロ | ╲╲       /~/\\
|ロ |     ╲ ╲(     •ω • )
|ロ |         ╲⊂          づ
|ロ |               ╲ ╲ ⊃⊃╲
|ロ |_              ╲| _ ╲|__
`;

            const dibujoGato = document.createElement("h2");
            dibujoGato.textContent = gato;
            dibujoGato.style.whiteSpace = "pre";
            form.appendChild(dibujoGato);

            let textoBienvenido = document.createElement("h1");
            textoBienvenido.textContent = "¡Bienvenido a bordo!";
            form.appendChild(textoBienvenido);


            setTimeout(()=>{
                window.location.href = 'index.html';
            }, 3000);










            })
    });
    //btns.addEventListener("click", (e) => {e.preventDefault(); window.location.href = 'index.html';});
}