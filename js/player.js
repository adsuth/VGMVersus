/**
 * Code courtesy of YouTube Player API docs.
 * Adjusted for use with VGMVersus
 */
var tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var player
var STAGGER_ERROR_MESSAGE = null

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: '',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onError': onError,
      'onStateChange': onPlayerStateChange
    }
  })
}
/**
 * Handles broken songs (eg when video cant be played or is taken down)
 * @param {Event} ev from YouTube player only, ignore if used elsewhere 
 */
function onError( ev = null ) {
  if ( ev?.data == 2 ) {
    return
  }
  console.warn(`PlayerError: ${ev?.data || "N/A"}\nsong index: ${song_current.index}\nname: ${song_current.name}\n(${song_current.url})`)
  cueNextSong()
}

function onPlayerReady() {
  changeVolume()
  game_start()
  cueNextSong()
  player.playVideo()
}

function onPlayerStateChange(ev) {
  if (ev.data == YT.PlayerState.CUED && !player.getVideoData()['video_id'] ) {
    STAGGER_ERROR_MESSAGE = setTimeout( ev => { onError( ev ) }, 1000 )
    return 
  }

  if (ev.data == YT.PlayerState.PLAYING) {
    clearTimeout( STAGGER_ERROR_MESSAGE )
    clearSongData()
    timers[CURRENT_PLAYER].start()
  } 
  else if (ev.data == YT.PlayerState.CUED) {
    clearSongData()
    timers[CURRENT_PLAYER].stop()
    player.playVideo()
  } 
  else if (ev.data == YT.PlayerState.PAUSED) {
    timers[CURRENT_PLAYER].stop()
  } 
  else if (ev.data == YT.PlayerState.ENDED) {
    timers[CURRENT_PLAYER].stop()
    window.setTimeout(cueNextSong, 1000)
  }
}