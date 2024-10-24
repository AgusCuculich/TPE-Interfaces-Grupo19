class Board extends Drawable{

    constructor(posX, posY, fill, context,rows, columns){
        super(posX,posY ,fill ,context );
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
    }



    createBoard(){

        let chips = [];

        for (let i = 0; i < this.rows; i++) {
            const fila = []; // Crear fila
            for (let j = 0; j < this.columns; j++) {
                let posX = 300 + j*10 * 15 + 100;
                let posY =  200 + i*10*10;
                let color = "#000000";
                let radius = 30;


                let chip = new Chip(posX,posY, radius, color, this.ctx,true);
                fila.push(chip);
                chips.push(chip);
                console.log(chip);


            }
            this.matrix.push(fila); // Agregar la fila creada a la matriz
        }

        console.table(this.matrix);
        return chips;
    }



}