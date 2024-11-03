// Representa una ficha. Ya sea ficha de jugador, un hueco del tablero, o un casillero para insertar fichas.
class Circle {

    constructor(x, y , radius, imgSrc, conBorde, draggable, player, slot = false, rowPos = null, colPos = null) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.img = new Image();
        this.img.src = imgSrc;
        this.conBorde = conBorde;
        this.draggable = draggable;
        this.player = player;
        this.slot = slot;

        //Posicion en la matriz de tablero
        this.rowPos = rowPos;
        this.colPos = colPos;

        this.startingPosX = x;
        this.startingPosY = y;
    }

    getPosX(){
        return this.x;
    }

    getPosY(){
        return this.y;
    }

    getRadius(){
        return this.radius;
    }

    getWidth() {
        return this.radius * 2;
    }

    isEmpty(){
        return this.isFree;
    }

    getRowPos(){
        return this.rowPos;
    }

    getColPos(){
        return this.colPos;
    }

    getPlayer() {
        return this.player;
    }

    getSlot(){
        return this.slot;
    }

    //Dibuja esta ficha
    draw(ctx) {
        // Dibujar borde si está habilitado
        if (this.conBorde) {
            this.dibujarBorde(ctx);
        }

        // Dibuja la imagen solo si está completamente cargada
        if (this.img.complete) {
            ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    changeColor(ctx) {
        if (this.conBorde) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = "#ffc13a";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    //Agrega un contorno a esta ficha
    dibujarBorde(ctx) {
        if (this.conBorde) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.setLineDash([8, 10]);
            ctx.strokeStyle = "grey";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    //Calcula la distancia entre el centro del circulo y la posicion dada.
    //Una distancia menor al radio indica que seguimos dentro del circulo
    isPointInside(x, y) {
        let _x = this.x - x;
        let _y = this.y - y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    // Comprueba si esta ficha se puede arrastrar (solo el jugador con el turno actual)
    isDraggable(player){
        return this.draggable && (this.player === player);
    }

    //Cambia el atributo resaltado para determinar de que forma se dibujara
    setResaltado(state){
        this.conBorde = state;
    }

    //Mover el elemento a un punto
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    //Define si este elemento se puede arrastrar o no
    setDraggableState(state){
        this.draggable = state;
    }

    //Comprueba si este elemento esta encerrando a otro
    encloses(other) {
        // Obtiene la posición del otro elemento
        const otherPosition = other.getPosition();
        const otherX = otherPosition.x;
        const otherY = otherPosition.y;

        // Calcula la distancia entre las figuras
        const distance = Math.sqrt(
            Math.pow(this.x - otherX, 2) + Math.pow(this.y - otherY, 2)
        );

        // Calcula el radio o el mayor lado para crear el área que se considera "dentro"
        const otherRadius = other.getRadius ? other.getRadius() : Math.max(other.getWidth(), other.getHeight()) / 2;

        // Si el radio es menor, está dentro
        return distance + otherRadius <= this.radius + 30;  // Le agregamos +30 al radio para dar margen de error al usuario
    }                                                       // para que no necesite ser 100% preciso en donde suelta el click


    //Obtener posicion global
    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        }
    }


    // Hace que esta ficha caiga a una posicion vertical determinada, a cierta velocidad.
    // la animacion incluye rebote, y refresca el frame en cada step
    descendTo(target_y, speed, renderCallBack) {
        let velocity = speed; // Velocidad Inicial
        let damping = 0.6; // Cuanto se amortigua el rebote en cada impacto
        let bounceThreshold = 3; // Umbral para detener la animacion cuando los rebotes sean minimos

        const animacionCaer = () => {
            // Hago descender el elemento
            this.y += velocity;
            velocity += 0.98; // Acelera la caida (gravedad simulada)

            // Cuando me pase del target_y deseado, reboto
            if (this.y >= target_y) {
                this.y = target_y; // Aseguro que no pase del target
                velocity = -velocity * damping; // Invierto la velocidad para simular el rebote

                // Si el rebote es demasiado pequeño, detengo la animación
                if (Math.abs(velocity) < bounceThreshold) {
                    this.y = target_y; // Ajusto a la posición final
                    if (renderCallBack) renderCallBack(); // Renderizo el frame (donde la ficha esta perfectamente alineada)
                    return; // Se detiene la animacion
                }
            }

            //Dibuja frames en cada step de la animación
            if (renderCallBack) {
                renderCallBack();
            }

            // Solicita el próximo frame de la animación
            requestAnimationFrame(animacionCaer);
        };

        // Inicio la animación
        requestAnimationFrame(animacionCaer);
    }
}