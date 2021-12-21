var songs_all = []
var songs_random = []
var song_current = {}

function random_init() {
    /*
        Gets all songs
        clamps all games to one array of songs
        clones array then randomises
    */
    $.ajax({
        url: "AA_Songs.json",
        dataType: "json",
        success: function(data) { 
            
            for ( let game in data ) {
                songs_all = songs_all.concat( data[game] )
            }

            songs_random = shuffleArray( songs_all.slice(0) )

        },
        async: false
    })

    cueNextSong()
}

function cueNextSong() {
    song_current = getSong()

    // updateSongData( song_current )
    player.cueVideoById( song_current.id )
}

function updateSongData( song ) {
    // update the data and image

    // gets the thumnail of the youtube video of the current song
    $.ajax({
        url: `https://img.youtube.com/vi/${ song.id }/maxresdefault.jpg`,
        success: function(data) {
            console.log( data )
            $("#song_thumbnail").attr("src", data)
        }
    })

    $("#song_name").html( song_current.name )
    $("#song_game").html( song_current.game )

}

function getRandomProperty( object ) {
    let keys = Object.keys(object);
    return object[keys[ Math.floor( keys.length * Math.random() ) ]];
}

function getRandomIndex(arr) {
    return Math.floor( Math.random() * arr.length )
}

function getSong() {
    return songs_random.pop()
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


