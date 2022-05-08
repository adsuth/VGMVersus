class Timer {
    constructor(root, settings = {}) {
        this.root = root
        this.notStarted = true
        
        this.interval = null
        
        this.maxSeconds = settings?.secs ?? 30 
        this.maxMinutes = settings?.mins ?? 1

        this.seconds = this.maxSeconds
        this.minutes = this.maxMinutes
    }

    start() {
        this.update()
        this.stop()
        this.interval = setInterval( () => { this.update() }, 1000 )
    }

    play() {
        this.stop()
        this.interval = setInterval( () => { this.update() }, 1000 )
    }
    
    stop() {
        if ( this.interval ) { clearInterval( this.interval ) }
    }

    reset() {
        this.stop()
        this.minutes = this.maxMinutes
        this.seconds = this.maxSeconds
        this.updateDisplay()
    }

    /**
     * Extend the timer by adding seconds
     * @param {Number} secs Seconds to be added to timer
     */
    addTime( secs=2 ) {
        this.seconds += secs
        if ( this.seconds > 59 ) {
            this.minutes++
            this.seconds %= 60
        }
        this.updateDisplay()
    }


    update() {
        this.seconds--
        
        // time up
        if (this.minutes <= 0 && this.seconds < 0) {
            // end game
            this.stop()
            return game_over()
        }

        // if a minute has passed
        if (this.seconds < 0) {
            this.minutes--
            this.seconds = 59
        }
        this.updateDisplay()
    }

    updateDisplay() {
        let displaySeconds = "" + this.seconds

        // format if seconds too short
        if (this.seconds.toString().length < 2) {
            displaySeconds = "0" + displaySeconds
        }

        $("#" + this.root).html(
            `${ this.minutes }:${displaySeconds}`
        )
    }
}