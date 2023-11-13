const controlledApp = {
    name: 'Controlled  app',
    description: 'Basic Canvas app for element controlling',
    version: '1.0.0',
    license: undefined,
    author: 'Ana',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    frameIndex: 0,
    background: undefined,
    player: undefined,
    gameVelocity: 1.5,
    platforms: [],
    tramps: [],
    trampolins: [],
    hearts: [],
    imgHeart: undefined,
    interval: undefined,
    finalPoints: 0,
    platformSize: {w: undefined, h: undefined},
    platformPosition: {x:undefined, y:undefined},
    init() {
        this.setContext()
        this.setDimensions()
        this.ambientMusic()
        this.createBackground()
        this.createHUD()
        this.createInitialPlatforms()
        this.drawAll()
        this.createPlatforms()
        this.start()
    },
    setContext() {
        this.canvasTag = document.getElementById('canvas');
        this.ctx = this.canvasTag.getContext('2d');
    },
    setDimensions() {
        this.canvasSize = {
            w: 500,
            h: 700,
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },
    createBackground(){
        this.background = new Background(this.ctx, this.canvasSize)
    },
    createHUD(){
        this.imgHeart = new Image()
        this.imgHeart.src = './images/red-heart.png'
    },
    drawHUD(){
        this.ctx.drawImage(this.imgHeart, 30, 10, 50, 50)
        this.ctx.font = "bold 60px serif"
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`${this.player.life}`, 95, 55)
        this.ctx.font = "bold 40px serif"
        this.ctx.fillStyle = 'black'
        this.ctx.fillText('POINTS' + '  ' + `${this.player.points}`, 230, 55)
    },
    ambientMusic(){
        this.music = new Audio()
        this.music.src = './sounds/ninja-music.mp3'
        this.music.volume = 0.2
        document.addEventListener('keydown', () => this.music.play())
    },
    start() {
        this.interval = setInterval(()=> {
            this.clearAll()
            this.drawAll()
            this.frameIndex++;
            this.clearObjects()
            this.objectsPosition()
            if (this.frameIndex % 15 === 0) this.getPoints()
            this.moveAll()
            if (this.player.life <= 0 || (this.player.playerPosition.y + this.player.playerSize.h) >= this.canvasSize.h || this.player.playerPosition.y <= -this.player.playerSize.h){
                this.gameOver()
            }
        }, 10)
    },
    drawAll() {
        if (!this.player) {
            this.player = new Player(this.ctx, this.canvasSize);
        }
        this.background.drawBackground()
        this.player.drawPlayer()
        this.drawObjects()
        this.checkCollisions()
        this.drawHUD()
        this.drawGameOver()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    createPlatforms(){
        this.platformSize = {w: Math.random()*(100-50)+50, h:25}
        this.platformPosition = {x:Math.random()*(this.canvasSize.w-this.platformSize.w), y:0}
        this.platforms.push(new Platform(this.ctx, this.canvasSize, this.platformSize, this.platformPosition, this.gameVelocity))
    },
    createInitialPlatforms(){
        for(let i = 100; i < this.canvasSize.h; i += 75){
            this.platformSize = {w: Math.random()*(125-75)+75, h:25}
            this.platformPosition = {
                x:Math.random()*((this.canvasSize.w/4)-(this.canvasSize.w-200))+this.canvasSize.w-200,
                y: i
            }
            this.platforms.push(new Platform(this.ctx, this.canvasSize, this.platformSize, this.platformPosition, this.gameVelocity))
        }
    },
    createTramps(){
        this.tramps.push(new Tramp(this.ctx, this.canvasSize, this.platformSize.w, this.platformPosition.x, this.gameVelocity))
    },
    createTrampolins(){
        this.trampolins.push(new Trampolin(this.ctx, this.canvasSize, this.platformSize.w, this.platformPosition.x, this.gameVelocity))
    },
    createHearts(){
        this.hearts.push(new Heart(this.ctx, this.canvasSize, this.gameVelocity))
    },
    drawObjects(){
        this.platforms.forEach(elm => elm.drawPlatform())
        this.tramps.forEach(elm => elm.drawTramp())
        this.trampolins.forEach(elm => elm.drawTrampolin())
        this.hearts.forEach(elm=>elm.drawHeart())
    },
    clearObjects(){
        this.platforms = this.platforms.filter(elm => elm.platformPosition.y <= this.canvasSize.h)
        this.tramps = this.tramps.filter(elm => elm.trampPosition.y <= this.canvasSize.h)
        this.trampolins = this.trampolins.filter(elm => elm.trampolinPosition.y <= this.canvasSize.h)
        this.hearts = this.hearts.filter(elm => elm.heartPosition.y <= this.canvasSize.h)
    },
    moveAll(){
        this.player.move()
        this.platforms.forEach(elm=>elm.movePlatform())
        this.tramps.forEach(elm=>elm.moveTramp())
        this.trampolins.forEach(elm=>elm.moveTrampolin())
        this.hearts.forEach(elm=>elm.moveHeart())
    },
    checkCollisions() {
        //Collisions with platforms
        this.platforms.forEach(elm=>{
            if(
                this.player.playerPosition.x + this.player.playerSize.w >= elm.platformPosition.x &&
                this.player.playerPosition.x <= elm.platformPosition.x + elm.platformSize.w &&
                this.player.playerPosition.y + this.player.playerSize.h <= elm.platformPosition.y + elm.platformSize.h &&
                this.player.playerPosition.y + this.player.playerSize.h + this.player.playerSpeed.y >= elm.platformPosition.y &&
                this.player.playerSpeed.y > 0
                ){
                    this.player.playerSpeed.y = -6
                }
            })
            //Collisions with tramps
            this.tramps.forEach(elm=>{
                if(
                    this.player.playerPosition.x + this.player.playerSize.w >= elm.trampPosition.x &&
                    this.player.playerPosition.x <= elm.trampPosition.x + elm.trampSize.w &&
                    this.player.playerPosition.y + this.player.playerSize.h >= elm.trampPosition.y &&
                this.player.playerPosition.y <= elm.trampPosition.y + elm.trampSize.h
                ){
                    this.player.playerHitted()
                }
            })
            //Collisions with trampolins
            this.trampolins.forEach(elm=>{
                if(
                this.player.playerPosition.x + this.player.playerSize.w >= elm.trampolinPosition.x &&
                this.player.playerPosition.x <= elm.trampolinPosition.x + elm.trampolinSize.w &&
                this.player.playerPosition.y + this.player.playerSize.h <= elm.trampolinPosition.y + elm.trampolinSize.h &&
                this.player.playerPosition.y + this.player.playerSize.h + this.player.playerSpeed.y >= elm.trampolinPosition.y &&
                this.player.playerSpeed.y > 0
                ){
                    this.player.playerJumpsMore()
                }
            })
            //Collisions with hearts
            this.hearts.forEach((elm, index)=>{
                if(
                    this.player.playerPosition.x + this.player.playerSize.w >= elm.heartPosition.x &&
                    this.player.playerPosition.x <= elm.heartPosition.x + elm.heartSize.w &&
                    this.player.playerPosition.y + this.player.playerSize.h >= elm.heartPosition.y &&
                    this.player.playerPosition.y <= elm.heartPosition.y + elm.heartSize.h
                    ){
                        this.player.playerGetsHeart()
                        this.hearts.splice(index, 1)
                    }
                })
            },
    objectsPosition(){
        if (this.frameIndex % 60 === 0) this.createPlatforms()
        if (this.frameIndex % 850 === 0) this.createTramps()
        if (this.frameIndex % 960 === 0) this.createTrampolins()
        if (this.frameIndex % 1500 === 0) this.createHearts() 
    },
    getPoints(){
        this.player.points ++
    },
    drawGameOver(){
        this.imgGameOver = new Image()
        this.imgGameOver.src = './images/game-over2.jpg'
    },
    gameOver(){
        this.ctx.drawImage(this.imgGameOver, 0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.font = "bold 60px serif"
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`${this.player.points}`, this.canvasSize.w/2-35, 250)
        clearInterval(this.interval)
        setTimeout(()=>{
            location.reload()
        }, 4000)
    }
}
