function formatSongUrl( url ) {
    return url.slice( url.lastIndexOf("/") + 1, url.length )
}

function getRandomProperty( object ) {
    let keys = Object.keys(object);
    return object[keys[ Math.floor( keys.length * Math.random() ) ]];
}

function getRandomIndex(arr) {
    return Math.floor( Math.random() * arr.length )
}

function shuffleArray( arr ) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
    
}

function updateSongData() {
    // TODO: show/hide player
    $("#song_name").html( song_current.name )
    $("#song_game").html( song_current.game )
}

function clearSongData() {
    $("#song_name").html( "-" )
    $("#song_game").html( "-" )
}