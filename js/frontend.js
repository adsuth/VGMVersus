
$(document).ready( function() {
    addEventListeners()
} )


function addEventListeners() {

    // events related to key presses (eg: arrow keys)
    addKeyEvents()

    $("#btn_closeModal").click( closeModal )
    $("#btn_showModal").click( showModal )

}

function addKeyEvents() {

    document.addEventListener( "keydown", function(ev) {
        if ( ev.key === "ArrowRight" ) { correctAnswer() }
        if ( ev.key === "ArrowLeft" ) { incorrectAnswer() }
        // if ( ev.key === "ArrowUp" ) { showSongData() }
    } )

}

function correctAnswer() {
    /*
        show the song,
        wait 500ms
        add song to 
        move on to next
    */
    timerPause()
    if ( state.game.isEnding === true ) {
        return
    }   
    state.game.isEnding = true;

    updateSongData( song_current )

    addSongToPrevious( song_current )

    window.setTimeout( () => {
        cueNextSong()
    }, 1000 )

}

function incorrectAnswer() {
    /*
        show the song,
        add song to prev (incorrect)
        wait 500ms
        move on to next
    */
    timerPause()
    if ( state.game.isEnding === true ) {
        return
    }  
    state.game.isEnding = true;
    addSongToPrevious( song_current, "error" )
    
    updateSongData( song_current )

    window.setTimeout( () => {
        cueNextSong()
    }, 1000 )

}



function closeModal() {
    $("#modal_wrapper").fadeOut()
}

function showModal() {
    $("#modal_wrapper").fadeIn()
}