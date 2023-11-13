class Trampolin {
    constructor(ctx, canvasSize, randomWidth, randomPositionX, gameVelocity){
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.trampolinSize = {w:40, h:30},
        this.trampolinPosition = {
            x: Math.random()*((randomPositionX+randomWidth-this.trampolinSize.w)-randomPositionX)+randomPositionX,
            y: -this.trampolinSize.h +5
        },
        this.trampolinSpeed = gameVelocity
        this.trampolinImage = new Image()
        this.trampolinImage.src = './images/trampolin5.png'
    }
    drawTrampolin(){
        this.ctx.drawImage(this.trampolinImage, this.trampolinPosition.x, this.trampolinPosition.y, this.trampolinSize.w, this.trampolinSize.h)
    }
    moveTrampolin(){
        this.trampolinPosition.y += this.trampolinSpeed
    }
}