class Firework {
    constructor(settings) {
        this.x = rng(null, width)
        this.y = height
        this.ySpeed = rng(3, 5)

        this.size = settings?.size ?? rng( (canvas.width /100) *0.5, (canvas.width /100) *1 )
        this.color = settings?.color ?? "red"

        this.hasExploded = false
        // this.particles = []

        this.endPoint = rng(height*0.25, height -height*0.25)
    }


    update() {
        if ( this.y < 0 ) { return }
        if ( this.y <= this.endPoint ) { this.explode() }
        this.y -= this.ySpeed
    }

    explode() {
        if ( this.hasExploded ) { return }
        let settings = {
            color: this.color,
            size: rng(this.size *0.75, this.size)
        }
        for ( let i = 0; i < rng(10, 30, true); i++ ) {
            particles.push( new Particle(this.x, this.y, settings) )
        }
        this.hasExploded = true
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc( this.x, this.y, this.size, 0, Math.PI *2, true )
        ctx.fill()
    }
}