/**
 * The main function for the app. Handles most of the "backend" of
 * the game loop. For frontend, see ./frontend.js
 */

$(document).ready(function () {
  applySettings()
})

/**
 * Note: async false is deprecated.
 * Should probably find another way to do this.
 */
function init_songs() {
  if (CURRENT_SONG_LISTS.hasOwnProperty(SONGS_FILE_NAME) && !DEFAULT_LISTS.includes( SONGS_FILE_NAME ) ) {
    return initSongsFromCurrent(CURRENT_SONG_LISTS[SONGS_FILE_NAME])
  }
  $.ajax({
    url: `./json/${SONGS_FILE_NAME || "main"}.json`,
    dataType: "json",
    success: function (data) {
      let songs_all = []
      for (let game in data) {
        songs_all = songs_all.concat(data[game])
      }
      songs_random = shuffleArray(songs_all.slice(0))
    },
    error: function (err) {
      addPopup( "Couldn't find file, try again. ", "error" )
    },
    async: false
  })
}

function initSongsFromCurrent(list) {
  let songs_all = []
  for (let game in list) {
    songs_all = songs_all.concat(list[game])
  }
  songs_random = shuffleArray(songs_all.slice(0))
}

function cueNextSong() {
  if (GAME_ENDED) return;
  ROUND_ENDED = false
  
  $("#player").css({
    visibility: "hidden"
  })
  clearSongData()

  song_current = getSong()

  player.cueVideoById( song_current.id )
}

function getSong() {
  if (songs_random.length == 0) {
    init_songs()
  }
  return songs_random.pop()
}

/**
 * Generates new list item with song name and game and adds to the current player's list.
 * @param {Object} song The current song
 * @param {string} color name of css color class to add to list item (eg: correct, warning, error) 
 */
function addSongToPrevious(song, color = "default") {
  let list = `${CURRENT_PLAYER}_list`
  if ($("#" + list).children().length > 100) {
    $("#" + list).children().get(0).remove()
  }

  let li = document.createElement("li")
  $(li).append(`<a href="${song.url}" target="_blank"><p class="${color}"><span class="bold">${song.game}</span><br>${song.name}</p>`)

  $("#" + list).append(li)
  document.getElementById(list).scrollTo(0, document.getElementById(list).scrollHeight)
}

/**
 * Massive function that just gets info from settings modal and
 * sets it to the GAME_SETTINGS object.
 * Also sets relevant things like timers, names, etc
 */
function applySettings() {
  GAME_SETTINGS = {
    startingPlayer: $('input[name="startingPlayer"]:checked').val(),
    startPercentage: $("#start_time_range").val(),
    mins: parseInt($("#t_minutes").val())  ?? 1,
    secs: parseInt($("#t_seconds").val())  ?? 30,
    inc: parseInt($("#t_increment").val()) ?? 2,
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
  $("#p1_name").html(GAME_SETTINGS.p1.name)
  $("#p2_name").html(GAME_SETTINGS.p2.name)

  // color settings
  $("#playerColors").html(`
        .p1 { --colorPlayer: ${GAME_SETTINGS.p1.color}; }
        .p2 { --colorPlayer: ${GAME_SETTINGS.p2.color}; }
    `)

  // time settings
  timers.p1 = new Timer("p1_timer", {
    mins: GAME_SETTINGS.mins,
    secs: GAME_SETTINGS.secs
  })
  timers.p2 = new Timer("p2_timer", {
    mins: GAME_SETTINGS.mins,
    secs: GAME_SETTINGS.secs
  })

  // set starting player
  CURRENT_PLAYER = GAME_SETTINGS.startingPlayer

  game_start()
}

/**
 * Called at the beginning of a new game.
 * Resets most attributes to ensure clean start.
 */
function game_start() {
  // reset game states
  GAME_ENDED = false
  GAME_PAUSED = false
  hasHalfAnswer = false
  FIREWORKS_STOPPED = true

  song_current = null
  clearSongData()

  $("#player").css({
    pointerEvents: "auto"
  });


  // reset game over sfx
  document.getElementById("sfx_gameover").pause()
  document.getElementById("sfx_gameover").currentTime = 0

  // hide victory fanfare visuals
  $("#canvas").hide()
  $("#victory_container > h1").removeClass("p1")
  $("#victory_container > h1").removeClass("p2")
  $("#victory_container").hide()

  // reset timers
  timers.p1.reset()
  timers.p2.reset()

  // set the current player to starting player
  CURRENT_PLAYER = GAME_SETTINGS.startingPlayer
  setPlayer()

  // reset lists
  $("#p1_list").empty()
  $("#p2_list").empty()

  if ( SESSION_STARTED )
    $("#btn_restart").html( "Restart" ) 

  init_songs()
  cueNextSong()
}

/**
 * Called at the end of a game (when a player's timer reaches zero)
 * 
 */
function game_over() {
  // set state
  GAME_ENDED = true
  FIREWORKS_STOPPED = false

  $("#player").css({
    pointerEvents: "none"
  });

  // show answer
  updateSongData()
  showAnswer()

  // play sfx
  document.getElementById("sfx_gameover").play()

  // show victor fanfare
  let victor = (CURRENT_PLAYER == "p1") ? "p2" : "p1"
  resetFireworks()
  animateFireworks()

  $("#canvas").show()
  $("#victory_container > h2").html(`${GAME_SETTINGS[victor].name}<br>wins!`)
  $("#victory_container > h2").addClass(victor)
  $("#victory_container").fadeIn()

  song_current = null
}

/**
 * Called when opening a modal, or performing another action that
 * would otherwise take the focus away from the game.
 */
function pause_game() {
  GAME_PAUSED = true
  timers[CURRENT_PLAYER].stop()
  player.pauseVideo()
}

/**
 * Called when focus is returned to the game (eg closing a modal)
 */
function resume_game() {
  // prevents resuming ended games from closing modals
  if (GAME_ENDED || GAME_PAUSED || !SESSION_STARTED || ROUND_ENDED ) return;
  timers[CURRENT_PLAYER].play()
  player.playVideo()
}