// game state
var GAME_SETTINGS = {}
var SONGS_FILE_NAME = null
var GAME_ENDED = false
var GAME_PAUSED = false

var CURRENT_PLAYER = GAME_SETTINGS.startingPlayer
var hasHalfAnswer = false

const DEFAULT_LISTS = [ "main" ]

// current state songs
var CURRENT_SONG_LISTS = {
  main: "main"
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
