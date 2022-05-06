var GAME_SETTINGS = {}
var SONGS_FILE_NAME = "pkmn"

var CURRENT_PLAYER = GAME_SETTINGS.startingPlayer
var hasHalfAnswer = false

var songs_all = []
var songs_random = []

var song_current = null

// for logging out errors
var firstLogEntry = true

var timerInterval;
const MAX_TIME = 1 // in minutes (note that seconds starts at 60, so its -1)

const timers = {
    p1: null,
    p2: null
}

$(document).ready(function() {
    applySettings()
    game_start()
})

function init_songs() {
    songs_all = []
    $.ajax({
        url: `./json/${SONGS_FILE_NAME || "main"}.json`,
        dataType: "json",
        success: function (data) {
            for (let game in data) {
                songs_all = songs_all.concat(data[game])
            }
            songs_random = shuffleArray(songs_all.slice(0))
        },
        error: function(err) {
            console.log("Couldn't find that directory!\nPlease try again.")
            showSettings()
        },
        async: false
    })
}

function cueNextSong() {
    $("#player").css({
        visibility: "hidden"
    })
    clearSongData()

    song_current = getSong()

    player.cueVideoById(song_current.id)
}

function getSong() {
    if ( songs_random.length == 0 ) { init_songs() }
    return songs_random.pop()
}

function addSongToPrevious(song, color = "default") {
    let list = `${CURRENT_PLAYER}_list`
    if ($("#" + list).children().length > 30) {
        $("#" + list).children().get(0).remove()
    }

    let li = document.createElement("li")
    $(li).append(`<a href="${song.url}" target="_blank"><p class="${color}"><span class="bold">${song.game}</span><br>${song.name}</p>`)


    $("#" + list).append(li)
    document.getElementById(list).scrollTo(0, document.getElementById(list).scrollHeight)
}

function applySettings() {
    GAME_SETTINGS = {
        startingPlayer: $('input[name="startingPlayer"]:checked').val(),
        mins: parseInt( $("#t_minutes").val() ) ?? 1,
        secs: parseInt( $("#t_seconds").val() ) ?? 30,
        inc: parseInt( $("#t_increment").val() ) ?? 2,
        p1: {
            name: $("#settings_p1_name").val(),
            color: $("#settings_p1_color").val(),
        },
        p2: {
            name: $("#settings_p2_name").val(),
            color: $("#settings_p2_color").val()
        }
    }
    // player names
    $("#p1_name").html( GAME_SETTINGS.p1.name )
    $("#p2_name").html( GAME_SETTINGS.p2.name )

    // color settings
    $("#playerColors").html(`
        .p1 { --colorPlayer: ${GAME_SETTINGS.p1.color}; }
        .p2 { --colorPlayer: ${GAME_SETTINGS.p2.color}; }
    `)

    // time settings
    timers.p1 = new Timer( "p1_timer", {
        mins: GAME_SETTINGS.mins,
        secs: GAME_SETTINGS.secs
    } )
    timers.p2 = new Timer( "p2_timer", {
        mins: GAME_SETTINGS.mins,
        secs: GAME_SETTINGS.secs
    } )

    // set starting player
    CURRENT_PLAYER = GAME_SETTINGS.startingPlayer

    SONGS_FILE_NAME = $("#songs_dir").val().trim()

    game_start()
}

function game_start() {
    timers.p1.reset()
    timers.p2.reset()

    CURRENT_PLAYER = GAME_SETTINGS.startingPlayer
    setPlayer()

    hasHalfAnswer = false
    $("#p1_list").empty()
    $("#p2_list").empty()
    
    init_songs()
    cueNextSong()
}

function pause_game() {
    timers[CURRENT_PLAYER].stop()
    player.pauseVideo()
}

function resume_game() {
    timers[CURRENT_PLAYER].play()
    player.playVideo()
}