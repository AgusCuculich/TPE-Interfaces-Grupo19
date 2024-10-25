class Board extends Drawable{

    constructor(posX, posY, fill, context,rows, columns){
        super(posX,posY ,fill ,context );
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
    }



    createBoard(){

        //Lista de elementos del tablero que el juego debera dibujar
        let boardElements = [];

        //Tablero amarillo
        let board = new Rect(300,150,950,500,"yellow",this.ctx,false);
        boardElements.push(board);



        //Calcular la cantidad maxima de fichas que tendra cada jugador (varia segun tablero)
        const maxChips = Math.ceil((this.rows * this.columns) / 2);


        //Crear fichas de jugadores
        for (let i = 0; i < maxChips; i++){

            //Jugador 1
            let p1_chip = new Chip(100,i*10 + 500,30,"#804000",this.ctx,true,false,"p1");

            //Jugador 2
            let p2_chip = new Chip(1500,i*10 + 500,30,"red",this.ctx,true,false,"p2");


            boardElements.push(p1_chip);
            boardElements.push(p2_chip);
        }


        //Slots (casilleros donde se puede meter una ficha)

        for (let i = 0; i < this.columns; i++){
            let slot = new Chip(300+i*10*15+100,90,50,"green",this.ctx,false,false,null,null,i,true);
            boardElements.push(slot);
        }




        //Fichas vacias
        for (let i = 0; i < this.rows; i++) {
            const fila = []; // Crear fila
            for (let j = 0; j < this.columns; j++) {
                let posX = 300 + j*10 * 15 + 100;
                let posY =  200 + i*10*10;
                let color = "#000000";
                let radius = 30;


                let chip = new Chip(posX,posY, radius, color, this.ctx,false,true,null,i,j);
                fila.push(chip);
                boardElements.push(chip);
                console.log(chip.getSlot());


            }
            this.matrix.push(fila); // Agregar la fila creada a la matriz
        }

        console.table(this.matrix);
        return boardElements;
    }


    //Calcular hasta que fila deberia caer la ficha (ya sabiendo su columna)

    findLandingRow(col) {
        let i = 0;
        while (i < this.rows) {

            if (!this.matrix[i][col].isEmpty()) {
                return i - 1; // Cuando detecta una fila ocupada,devuelve la de arriba
            }
            i++;
        }
        // Si la ultima fila tambien esta vacia, devuelvo esa
        return this.rows - 1;
    }


    getChip(row,column){
        return this.matrix[row][column];
    }

    putChip(row,column, element){
        this.matrix[row][column] = element;
    }




    DEBUG_RENDERMATRIZ(){
        console.table(this.matrix);
    }

    DEBUG_MATRIZELEMENTO(row,col){
        console.log(this.matrix[row][col]);
    }

}