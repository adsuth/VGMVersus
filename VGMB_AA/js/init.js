var SONG = {
    all_songs: null,
    random_songs: null,
    current_song: null,
    
}

function random_init() {
    /*
        Gets all songs
        clamps all games to one array of songs
        generates a list of ids
        randomly permutes array
    */
    $.ajax({
        url: "AA_Songs.json",
        dataType: "json",
        success: function(data) { 
            
            for ( let game in data ) {
                SONG.all_songs = SONG.all_songs.concat( data[game] )
            }

            SONG.random_songs = shuffleArray( SONG.all_songs.slice(0) )

        },
        async: false
    })

    cueNextSong()
}

function cueNextSong() {
    player.cueVideoById( getSong() )
}

function getRandomProperty( object ) {
    let keys = Object.keys(object);
    return object[keys[ Math.floor( keys.length * Math.random() ) ]];
}

function getRandomIndex(arr) {
    return Math.floor( Math.random() * arr.length )
}

function getSong() {
    let song = song_list.pop()
    return formatSongUrl( song.url )
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

