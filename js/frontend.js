
$(document).ready( function() {

    addEventListeners()
} )

function addEventListeners() {

    $("#btn_next").click( function() {
        alert("NEXT!")
    } )

}

// Song Data
function updateSongData() {
    $("#song_data").html(
        `
        Title: ${current_song}
        `
    )
}

