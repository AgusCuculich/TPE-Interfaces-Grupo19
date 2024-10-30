class Text extends Drawable{
    constructor(posX, posY, fill, context, text) {
        super(posX,posY,fill,context);
        this.text = text;
    }

    draw(){
        super.draw();
        this.ctx.fillText(this.text,this.posX,this.posY);
    }

    changeFont(newFont){
        this.ctx.font = newFont;
    }

    changeText(newText) {
        this.text = newText;
    }

}