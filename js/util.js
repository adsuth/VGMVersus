/**
 * Shuffles given array (Durstenfeld Shuffle)
 * (stolen from Stack Overflow here: https://stackoverflow.com/a/12646864)
 * @param {Array} arr
 * @returns shuffled array
 */
function shuffleArray( arr ) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
}



function clearSongData() {
    $("#song_name").html( "-" )
    $("#song_game").html( "-" )
}