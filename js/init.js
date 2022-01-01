var songs_all = []
var songs_random = []
var song_current = {}
var timerInterval;
const MAX_TIME = 1 // in minutes (note that seconds starts at 60, so its -1)
var state = {
    game: {
        isEnding: false
    },
    timer: {
        isOff: true,
        seconds: 0,
        minutes: MAX_TIME
    }
}

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

    // begin timer
    timerStart()
    timerInterval = window.setInterval( timerLoop, 1000 )

    cueNextSong()
}

function cueNextSong() {
    song_current = getSong()

    // updateSongData( song_current )
    player.cueVideoById( song_current.id )
}

function updateSongData() {
    // update image
    // gets the thumbnail of the youtube video of the current song
    $("#song_name b").html( song_current.name )
    $("#song_game").html( song_current.game )
}

function clearSongData() {
    $("#song_name b").html( "-" )
    $("#song_game").html( "-" )
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

function addSongToPrevious( song, color="default" ) {
    if ( $("#prev_list").children().length > 30 ) { $("#prev_list").children().shift() }
    let li = `
        <li class="prev_game">
            <p class="${color} bold">${song.game}</p>
            <p class="${color}">${song.name}</p>
        </li>
    `
    $("#prev_list").append( li )
    document.getElementById("prev_list").scrollTo( 0, document.getElementById("prev_list").scrollHeight )
}

function gameOver() {
    updateTimer()
    timerStop()
}