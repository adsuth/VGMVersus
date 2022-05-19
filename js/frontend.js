$(document).ready(function () {
    addEvents()
})


function addEvents() {
    // events related to key presses (eg: arrow keys)
    document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape") {
            pause_game()
            showSettings()
            $("#songs_dir").focus()
        }
        
        if ( GAME_ENDED || GAME_PAUSED ) { return }

        if (ev.key === "ArrowRight") {
            ev.preventDefault()
            correctAnswer()
        }
        if (ev.key === "ArrowLeft") {
            ev.preventDefault()
            halfAnswer()
        }
        if (ev.key === "ArrowUp") {
            ev.preventDefault()
            showAnswer()
        }
        if (ev.key === "ArrowDown") {
            ev.preventDefault()
            incorrectAnswer()
        }
    })

    modalEvents()
    mobileEvents()

    $("#btn_showSettings").click(() => {
        pause_game()
        showSettings()
        $("#songs_dir").focus()
    })

    $("#btn_showHelp").click(() => {
        pause_game()
        $("#help_wrapper").fadeIn(200)
    })

    $("#btn_restart").click(() => {
        game_start()
        init_songs()
    })

    $("#btn_restart").click(() => {
        game_start()
        init_songs()
    })

}

function switchPlayer() {
    timers[CURRENT_PLAYER].addTime(GAME_SETTINGS.inc)
    timers[CURRENT_PLAYER].stop()

    if (CURRENT_PLAYER == "p1") {
        CURRENT_PLAYER = "p2"
    } else {
        CURRENT_PLAYER = "p1"
    }

    setPlayer()
}

function setPlayer() {
    $(`#p1_section`).removeClass("p1")
    $(`#p2_section`).removeClass("p2")
    $(`#${CURRENT_PLAYER}_section`).addClass(CURRENT_PLAYER)
}

function halfAnswer() {
    if ( GAME_ENDED ) { return }
    addSongToPrevious(song_current, "warning")

    if (hasHalfAnswer) {
        switchPlayer()
    }
    hasHalfAnswer = !hasHalfAnswer
    cueNextSong()
}

function correctAnswer() {
    if ( GAME_ENDED ) { return }
    if (hasHalfAnswer) {
        return halfAnswer()
    }

    addSongToPrevious(song_current, "correct")
    switchPlayer()

    cueNextSong()
}

function incorrectAnswer() {
    if ( GAME_ENDED ) { return }
    if ( GAME_ENDED ) { return }
    addSongToPrevious(song_current, "error")
    cueNextSong()
}

function showAnswer() {
    // if ( GAME_ENDED ) { return }
    player.pauseVideo()
    $("#player").css({
        visibility: "visible"
    })
    updateSongData(song_current)
}

function updateSongData() {
    // TODO: show/hide player
    $("#song_name").html( song_current.name )
    $("#song_game").html( song_current.game )
}

function mobileEvents() {
    $("#extra_controls").hide()

    $("#ctrl_extras").click( function() {
        let extrasShown = $("#extra_controls").css("display") == "grid"
        if ( extrasShown ) { hideExtraControls() }
        else { showExtraControls() }
    } )

    $(".ctrl_correct").each( (index, btn) => {
        $(btn).click( correctAnswer )
    } )

    $(".ctrl_show").each( (index, btn) => {
        if ( GAME_ENDED ) { return }
        $(btn).click( showAnswer )
    } )

    $("#ctrl_half").click( () => {
        if ( GAME_ENDED ) { return }
        halfAnswer()
    } )
    $("#ctrl_wrong").click( () => {
        if ( GAME_ENDED ) { return }
        incorrectAnswer()
    } )
}

function showExtraControls() {
    $("#extra_controls").show( () => {
        $("#extra_controls").css( {display: "grid"} )
    })
    $("#ctrl_extras").toggleClass( "active" )
}

function hideExtraControls() {
    $("#extra_controls").hide( () => {
    })
    $("#ctrl_extras").toggleClass( "active" )
}