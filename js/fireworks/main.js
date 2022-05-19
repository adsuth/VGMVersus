const canvas = document.getElementById("canvas")

// set the canvas props here to fix low res
canvas.height = canvas.getBoundingClientRect().height
canvas.width = canvas.getBoundingClientRect().width

const ctx = canvas.getContext("2d")
const height = canvas.height
const width = canvas.width 

var fireworks = []
var particles = []

var FIREWORKS_STOPPED = true

function initFireworks(quantity=50) {
    FIREWORKS_STOPPED = false
    let output = []
    let color = (CURRENT_PLAYER == "p1") ? GAME_SETTINGS.p2.color : GAME_SETTINGS.p1.color
    for ( let i = 0; i < quantity; i++ ) {
        output.push( new Firework({
            color
            // color: colors[ Math.floor( Math.random() *colors.length ) ]
        }) )
    }
    return output
}

function animateFireworks() {
    if ( FIREWORKS_STOPPED ) { return }
    if ( fireworks.length === 0 ) { fireworks = initFireworks() }
    ctx.clearRect( 0, 0, width, height )

    for ( let p of particles ) {
        p.update()
        p.draw()
    }
    for ( let fw of fireworks ) {
        fw.update()
    }

    particles = particles.filter( p => {
        return p.life > 0
    } )
    fireworks = fireworks.filter( fw => !fw.hasExploded )

    window.requestAnimationFrame( animateFireworks )
}


/**
 * Utility to generate random numbers within ranges
 */
function rng( min=null, max=10, isInt=false ) {
    let output = Math.random() *max
    if ( min ) {
        while ( output < min ) {
            output += Math.random() *4
        }
    }
    if ( isInt ) { Math.floor(output) }
    return output
}


function resetFireworks() {
    fireworks = []
    particles = []
}