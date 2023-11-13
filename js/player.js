class Player {
    constructor (ctx, canvasSize){
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.playerInstance = undefined,
        this.playerSize = {w: 80, h: 80},
        this.playerPosition = { 
            x: this.canvasSize.w/2 - this.playerSize.w/2, 
            y: this.canvasSize.h/2 
        }
        this.playerSpeed = {x:0, y:1}
        this.playerGravity = 0.12
        this.fluidLeft = false,
        this.fluidRight = false,
        this.life = 3,
        this.points = 0,
        this.playerDown = new Image(),
        this.playerUp = new Image()
        this.playerHitUp = new Image(),
        this.playerHitDown = new Image(),
        this.soundHit = new Audio()
        this.soundLife = new Audio()
        this.soundJump = new Audio()
        this.isInmortal = false
        this.isHurt = false
        this.blinkTimer = 0
        this.setEventListeners()
        this.init()
    }
    init(){
        this.createPlayer()
    }
    createPlayer() {
        this.playerDown.src = './images/down.png'
        this.playerUp.src = './images/up.png'
        this.playerHitUp.src = './images/up-red.png'
        this.playerHitDown.src = './images/down-red.png'
        this.soundHit.src = './sounds/sound-hit.mp3'
        this.soundHit.volume = 0.6
        this.soundLife.src = './sounds/sound-life.mp3'
        this.soundLife.volume = 0.6
        this.soundJump.src = './sounds/sound-jump.mp3'
        this.soundJump.volume = 0.6
    }
    drawPlayer(){
        if (this.isInmortal && this.blinkTimer % 2 === 0) {
            if (this.playerSpeed.y < 0) {
                this.ctx.drawImage(this.playerHitUp, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h);
            } else if (this.playerSpeed.y > 0) {
                this.ctx.drawImage(this.playerHitDown, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h);
            }
        } else {
            // Si el temporizador no es par, muestra la imagen correspondiente al movimiento
            if (this.playerSpeed.y < 0) {
                this.ctx.drawImage(this.playerUp, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h);
            } else if (this.playerSpeed.y > 0) {
                this.ctx.drawImage(this.playerDown, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h);
            }
        }
    }
    setEventListeners() {
        document.onkeydown = ({key}) => {
            if (key === 'ArrowLeft') this.fluidLeft = true;
            if (key === 'ArrowRight') this.fluidRight = true;
        }
        document.onkeyup = ({key}) => {
            if (key === 'ArrowLeft') this.fluidLeft = false;
            if (key === 'ArrowRight') this.fluidRight = false;
        }
    }
    move() {
        // left and right movement
        if (this.fluidLeft) this.playerSpeed.x = -2;
        else if (this.fluidRight) this.playerSpeed.x = 2;
        else this.playerSpeed.x = 0;
        this.playerPosition.x += this.playerSpeed.x;
        this.stayOnCanvas();

        //jumping movement
        this.playerPosition.y += this.playerSpeed.y
        this.playerSpeed.y += this.playerGravity
        if (this.playerPosition.y > this.canvasSize.h - this.playerSize.h) {
            this.playerSpeed.y = -1
        }
        
    }
    stayOnCanvas() {
        if (this.playerPosition.x + this.playerSize.w/2 > this.canvasSize.w) {
            this.playerPosition.x = 0
        } else if (this.playerPosition.x + this.playerSize.w/2 < 0) {
            this.playerPosition.x = this.canvasSize.w - this.playerSize.w
        }
    }
    playerHitted(){
        if (!this.isInmortal){
            this.life --
            this.isInmortal = true
            this.soundHit.play()
            const idInterval = setInterval(()=>{
                this.blinkTimer++
            },10)
            setTimeout(()=>{
                this.isInmortal = false;
                this.blinkTimer = 0
                clearInterval(idInterval)
            }, 2000)
        }
    }
    playerJumpsMore(){
        this.playerSpeed.y = -8
        this.soundJump.play()
    }
    playerGetsHeart(){
        this.soundLife.play()
        if (this.life<3){
            this.life ++
        } else {
            this.points += 50
        }
    }
    
}

