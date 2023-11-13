class Tramp {
    constructor(ctx, canvasSize, randomWidth, randomPositionX, gameVelocity) {
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.trampSize = {w:35, h:30},
        this.trampPosition = {
            x: Math.random()*((randomPositionX+randomWidth-this.trampSize.w)-randomPositionX)+randomPositionX,
            y: -this.trampSize.h
        },
        this.trampSpeed = gameVelocity
        this.trampImage = new Image(),
        this.trampImage.src = './images/tramp.png'
    }
        drawTramp(){
            this.ctx.drawImage(this.trampImage, this.trampPosition.x, this.trampPosition.y, this.trampSize.w, this.trampSize.h)
        }
        moveTramp(){
            this.trampPosition.y += this.trampSpeed
        }


    }
