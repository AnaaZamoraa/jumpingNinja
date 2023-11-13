class Heart {
    constructor(ctx, canvasSize, gameVelocity){
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.heartSize = {w:30, h:30},
        this.heartPosition = {
            x: Math.random()*((this.canvasSize.w-this.heartSize.w)-0)+0,
            y: -this.heartSize.h
        },
        this.heartSpeed = gameVelocity
        this.heartImage = new Image()
        this.heartImage.src = './images/green-heart.png'
    }
    drawHeart(){
        this.ctx.drawImage(this.heartImage, this.heartPosition.x, this.heartPosition.y, this.heartSize.w, this.heartSize.h)
    }
    moveHeart(){
        this.heartPosition.y += this.heartSpeed
    }
}