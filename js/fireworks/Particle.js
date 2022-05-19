
class Particle {
    constructor(x, y, settings) {
        this.x = x
        this.y = y 

        this.ySpeed = -5 +Math.random() *10
        this.xSpeed = -5 +Math.random() *10

        this.life = 100 // how many updates before fading
        this.decayRate = rng(1, 5, true)
        
        this.size = settings?.size
        this.color = settings?.color ?? "#ffffff"
    }

    update() {
        this.y += this.ySpeed
        this.x += this.xSpeed
    }

    draw() {
        if ( !this.life ) { return }
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.life /100
        ctx.beginPath()
        ctx.arc( this.x, this.y, this.size, 0, Math.PI *2, true )
        ctx.fill()
        this.life -= this.decayRate
    }
}