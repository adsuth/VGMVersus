
$(document).ready( function() {

    addEventListeners()
} )


function addEventListeners() {

    // events related to key presses (eg: arrow keys)
    addKeyEvents()

    $("#btn_next").click( function() {
    } )

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

    updateSongData( song_current )

    addSongToPrevious( song_current, "correct" )

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

    addSongToPrevious( song_current, "correct" )

}

function addSongToPrevious( song, color ) {
    let li = `
        <li class="prev_game">
            <p class="${color}"> <b>${song.game}</b></p>
            <p class="${color}">${song.name}</p>
        </li>
    `
}

