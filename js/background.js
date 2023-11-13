class Background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.positionBackground = {x:0, y:0},
        this.velBackground = 1,
        this.backgroundImage = new Image(),
        this.backgroundImage.src = './images/background.jpg'
    }
    drawBackground(){
        this.ctx.drawImage(this.backgroundImage, this.positionBackground.x, this.positionBackground.y, this.canvasSize.w, this.canvasSize.h)
        this.ctx.drawImage(this.backgroundImage, this.positionBackground.x, this.positionBackground.y - this.canvasSize.h, this.canvasSize.w, this.canvasSize.h)
        this.moveBackground()
    }
    moveBackground(){
        if(this.positionBackground.y >= this.canvasSize.h){
            this.positionBackground.y = 0;
        }
        this.positionBackground.y += this.velBackground
    }
    
}