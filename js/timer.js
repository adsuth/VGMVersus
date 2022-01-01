/*
    Timer
*/

function timerStart() {
    updateTimer()
    timerResume()
}

function timerStop() {
    timerPause()
    window.clearInterval( timerInterval )
}

function timerResume() {
    state.timer.isOff = false
}

function timerPause() {
    state.timer.isOff = true
}

function timerLoop() {
    // dont do anything is timer stopped
    if ( state.timer.isOff ) { return }
    
    // when times up
    if ( state.timer.minutes <= 0 && state.timer.seconds <= 1 ) {
        /*
            end game
        */
       
        gameOver()
    }

    // still have time
    else {
        /*
            increment timer
            make sure minutes 
            update timer on screen
        */
       // if a minute has passed
       if ( state.timer.seconds <= 0 ) {
           state.timer.minutes--
           state.timer.seconds = 59
        }   
        
        // update display
        updateTimer()
        
    }

    state.timer.seconds--
}

function updateTimer() {
    let displaySeconds = "" + state.timer.seconds
    // if seconds too short
    if ( state.timer.seconds.toString().length < 2 ) {
        displaySeconds = "0" + displaySeconds
    }
    $("#timer").text(
        `${ state.timer.minutes }:${displaySeconds}`
    )

}

function toggleTimerColor() {
    $("#timer").toggleClass("error")
}