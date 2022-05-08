
function modalEvents() {
    $("#help_close").click( () => {
        GAME_PAUSED = false
        $("#help_wrapper").fadeOut(200)
        resume_game()
    })

    $("#settings_start").click( () => {
        GAME_PAUSED = false
        applySettings()
        hideSettings()
    })
    $("#settings_close").click( () => {
        GAME_PAUSED = false
        hideSettings()
        resume_game()
    })
    
    $("#songs_dir").keydown( ev => {
        if ( ev.keyCode === 13 ) {
            GAME_PAUSED = false
            applySettings()
            hideSettings()
        }
    })

    // prevent typing values into settings number fields
    $(".settings_number").keydown( ev => {
        ev.preventDefault()
    } )
    $(".settings_number").on( "dragstart", ev => {
        ev.preventDefault()
    } )
}

function showSettings() {
    $("#settings_wrapper").fadeIn(200)
}
function hideSettings() {
    $("#settings_wrapper").fadeOut(200)
}

