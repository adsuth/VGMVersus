
$(document).ready( function() {
    addEvents()
} )


function addEvents() {
    // events related to key presses (eg: arrow keys)
    document.addEventListener( "keydown", function(ev) {
        if ( ev.key === "Escape" ) { 
            pause_game()
            showSettings()
            $("#songs_dir").focus() 
        }
        if ( ev.key === "ArrowRight" ) { correctAnswer() }
        if ( ev.key === "ArrowLeft" ) { halfAnswer() }
        if ( ev.key === "ArrowUp" ) { showAnswer() }
        if ( ev.key === "ArrowDown" ) { incorrectAnswer() }
        // if ( ev.key === "ArrowUp" ) { showSongData() }
    } )

    modalEvents()

    $("#btn_showSettings").click( () => {
        pause_game()
        showSettings()
        $("#songs_dir").focus()
    } )

    $("#btn_showHelp").click( () => {
        pause_game()
        $("#help_wrapper").fadeIn(200)
    } )
    
    $("#btn_restart").click( () => {
        game_start()
        init_songs()
    } )

    $("#btn_restart").click( () => {
        game_start()
        init_songs()
    } )
    
}

function switchPlayer() {
    timers[CURRENT_PLAYER].addTime( GAME_SETTINGS.inc )
    timers[CURRENT_PLAYER].stop()

    if ( CURRENT_PLAYER == "p1" ) { CURRENT_PLAYER = "p2" }
    else { CURRENT_PLAYER = "p1" }

    setPlayer()
}

function setPlayer() {
    $(`#p1_section`).removeClass( "p1" )
    $(`#p2_section`).removeClass( "p2" )
    $(`#${CURRENT_PLAYER}_section`).addClass( CURRENT_PLAYER )
}

function halfAnswer() {
    addSongToPrevious( song_current, "warning" )

    if ( hasHalfAnswer ) { switchPlayer() }
    hasHalfAnswer = !hasHalfAnswer
    cueNextSong()
}

function correctAnswer() {
    if ( hasHalfAnswer ) { return halfAnswer() }

    addSongToPrevious( song_current, "correct" )
    switchPlayer()
    
    cueNextSong()
}

function incorrectAnswer() {
    addSongToPrevious( song_current, "error" )
    cueNextSong()
}

function showAnswer() {
    player.pauseVideo()
    $("#player").css({visibility: "visible"})
    updateSongData( song_current )
}

function gameOver() {
    victor = (CURRENT_PLAYER == "p1") ? "p2" : "p1"
    timers.p1.stop()
    timers.p2.stop()
    
    endgameModal.setTitle( `${victor} wins!` )
    endgameModal.show()
}

function initModal() {
    
    
}