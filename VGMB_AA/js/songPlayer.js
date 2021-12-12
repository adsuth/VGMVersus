$(document).ready( function(){
    $.getJSON( "AA_Songs.json", function(data) {
        let games = Object.keys(data)
        alert( games )
    } )

} )

function getRandomGame() {
    
}

function getSong() {

}