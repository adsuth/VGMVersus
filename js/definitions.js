// game state
var GAME_SETTINGS = {}
var SONGS_FILE_NAME = null
var GAME_ENDED = false
var GAME_PAUSED = false
var SESSION_STARTED = false

var CURRENT_PLAYER = GAME_SETTINGS.startingPlayer
var hasHalfAnswer = false

var CURRENT_VOLUME = 80

var popupTimeout = null

const DEFAULT_LISTS = [ "main", "mario", "megaman", "pokemon", "sonic" ]

// current state songs
var CURRENT_SONG_LISTS = {
  main: "main",
  mario: "mario",
  megaman: "megaman",
  pokemon: "pokemon",
  sonic: "sonic",
}

// songs
var songs_random = []
var song_current = null

// timers for players
const timers = {
  p1: null,
  p2: null
}

const MAX_SUGGESTIONS = 5
