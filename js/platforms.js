class Platform {
    constructor (ctx, canvasSize, platformSize, platformPosition, gameVelocity){
        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.platformSize = platformSize
        this.platformPosition = platformPosition,
        this.platformSpeed = gameVelocity;
        this.platformImage = new Image(),
        this.platformImage.src = './images/platform.png'
    }
    drawPlatform(){
        this.ctx.drawImage(this.platformImage, this.platformPosition.x, this.platformPosition.y, this.platformSize.w, this.platformSize.h)
    }
    movePlatform(){
        this.platformPosition.y += this.platformSpeed
    }
}