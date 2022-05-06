
function modalEvents() {
    $("#help_close").click( () => {
        $("#help_wrapper").fadeOut(200)
        resume_game()
    })

    $("#settings_start").click( () => {
        applySettings()
        hideSettings()
    })
    $("#settings_close").click( () => {
        hideSettings()
        resume_game()
    })
    
    $("#songs_dir").keydown( ev => {
        if ( ev.keyCode === 13 ) {
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

