$(document).ready(function () {
  $("#extra_controls").css( { display: "grid" } )
  $("#extra_controls").hide()

  $("#settings_p1_color").css( { background: $("#settings_p1_color").val() } )
  $("#settings_p2_color").css( { background: $("#settings_p2_color").val() } )

  addEvents()
})


function addEvents() {
  // events related to key presses (eg: arrow keys)
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      pause_game()
      showSettings()
      $("#songs_dir").focus()
    }

    if (GAME_ENDED || GAME_PAUSED) return;

    if (ev.key === "ArrowRight") {
      ev.preventDefault()
      correctAnswer()
    }
    if (ev.key === "ArrowLeft") {
      ev.preventDefault()
      halfAnswer()
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault()
      showAnswer()
    }
    if (ev.key === "ArrowDown") {
      ev.preventDefault()
      incorrectAnswer()
    }
  })

  modalEvents()
  mobileEvents()

  $("#btn_showSettings").click(() => {
    pause_game()
    showSettings()
    $("#songs_dir").focus()
  })

  $("#btn_showHelp").click(() => {
    pause_game()
    $("#help_wrapper").fadeIn(200)
  })

  $("#btn_showGenerator").click(() => {
    pause_game()
    $("#generator_wrapper").fadeIn(200)
  })

  $("#btn_restart").click(() => {
    game_start()
    init_songs()
  })

  $("#settings_p1_color").on( "input propertychange", () => {
    $("#settings_p1_color").css( { background: $("#settings_p1_color").val() } )
  } )
  $("#settings_p2_color").on( "input propertychange", () => {
    $("#settings_p2_color").css( { background: $("#settings_p2_color").val() } )
  } )

  for ( let inp of $( ".songs_dir" ) )
  {
    inp.addEventListener( "input", ev => { suggest( ev ) } )
    inp.addEventListener( "focus", ev => { suggest( ev ) }  )
    inp.addEventListener( "blur",  ev => {
      clearSuggestion( ev ) 
    })
  }

  document.getElementById( "volume" ).addEventListener( "input", ev => { changeVolume( ev.target.valueAsNumber ) } )

}

function switchPlayer() {
  timers[CURRENT_PLAYER].addTime(GAME_SETTINGS.inc)
  timers[CURRENT_PLAYER].stop()

  if (CURRENT_PLAYER == "p1") {
    CURRENT_PLAYER = "p2"
  } else {
    CURRENT_PLAYER = "p1"
  }

  setPlayer()
}

function setPlayer() {
  $(`#p1_section`).removeClass("p1")
  $(`#p2_section`).removeClass("p2")
  $(`#${CURRENT_PLAYER}_section`).addClass(CURRENT_PLAYER)
}

function halfAnswer() {
  if (GAME_ENDED) {
    return
  }
  addSongToPrevious(song_current, "warning")

  if (hasHalfAnswer) {
    switchPlayer()
  }
  hasHalfAnswer = !hasHalfAnswer
  cueNextSong()
}

function correctAnswer() {
  if (GAME_ENDED) {
    return
  }
  if (hasHalfAnswer) {
    return halfAnswer()
  }

  addSongToPrevious(song_current, "correct")
  switchPlayer()

  cueNextSong()
}

function incorrectAnswer() {
  if (GAME_ENDED) {
    return
  }
  if (GAME_ENDED) {
    return
  }
  addSongToPrevious(song_current, "error")
  cueNextSong()
}

function showAnswer() {
  // if ( GAME_ENDED ) { return }
  if ( player.getPlayerState() !== YT.PlayerState.PLAYING && !GAME_ENDED )
    return

  player.pauseVideo()
  $("#player").css({
    visibility: "visible"
  })
  updateSongData()
}

function updateSongData() {
  // TODO: show/hide player
  $("#song_name").html( song_current.name )
  $("#song_game").html( song_current.game )
}

function mobileEvents() {
  $("#ctrl_extras").click(function () {
    let extrasShown = $("#extra_controls").css("display") == "grid"
    if (extrasShown) {
      hideExtraControls()
    } else {
      showExtraControls()
    }
  })

  $(".ctrl_correct").each((index, btn) => {
    $(btn).click(correctAnswer)
    $(btn).blur()
  })

  $(".ctrl_show").each((index, btn) => {
    if (GAME_ENDED) {
      return
    }
    $(btn).click(showAnswer)
    $(btn).blur()
  })

  $("#ctrl_half").click(() => {
    if (GAME_ENDED) {
      return
    }
    halfAnswer()
    $(btn).blur()
  })
  $("#ctrl_wrong").click(() => {
    if (GAME_ENDED) {
      return
    }
    incorrectAnswer()
    $(btn).blur()
  })
}

function showExtraControls() {
  $("#extra_controls").show(() => {
    $("#extra_controls").css({
      display: "grid"
    })
  })
  $("#ctrl_extras").toggleClass("active")
}

function hideExtraControls() {
  $("#extra_controls").hide(() => {})
  $("#ctrl_extras").toggleClass("active")
}

function suggest( ev )
{
  let query = ev.target.value
  clearSuggestion( null )
  getSuggestions( query )
}

function getSuggestions( query )
{
  let count = 0
  let lists = $( ".songs_dir_list" )
  
  for ( let songList of Object.keys( CURRENT_SONG_LISTS ) )
  {
    if ( count >= MAX_SUGGESTIONS ) return;
    if ( songList.includes( query ) || query.length === 0 )
    {
      for ( let list of lists )
      {
        $( list ).append( createSuggestion( songList ) )
      }
      count++
    }
  }
}

function createSuggestion( content )
{
  let li = document.createElement( "li" )
  li.innerText = content
  li.addEventListener( "mousedown", selectSuggestion )
  return li
}

function clearSuggestion( ev )
{
  let lists = $( ".songs_dir_list" )
  for ( let list of lists )
  {
    $( list ).html( "" )
  }
}

function selectSuggestion( ev )
{
  ev.preventDefault()
  SONGS_FILE_NAME = ev.target.innerText
  clearSuggestion()

  for ( let inp of $( ".songs_dir" ) )
  {
    $( inp ).blur()
    $( inp ).val( "" )
  }

  addPopup( `Selected tracklist: "${ev.target.innerText}". Restart to play!`, "clear" )
}

function addPopup( content="", type="" )
{
  if ( popupTimeout )
  {
    clearAllPopups()
  }

  let popup = createPopup( content, type )
  $( "#popups" ).append( popup )
  popupTimeout = setTimeout( () => { removePopup( popup ) }, 10000 )
}

function clearAllPopups()
{
  clearTimeout( popupTimeout )
  $( "#popups" ).html("")
}

function removePopup( popup )
{
  clearTimeout( popupTimeout )
  popup.removeEventListener( "click", popup.fn )
  $( popup ).fadeOut( 800, () => {
    popup.remove()
  } )
}

function createPopup( content="", type="" )
{
  let popup = document.createElement( "p" )
  popup.innerText = content
  popup.className = type
  popup.addEventListener( "click", popup.fn = function( ev ) {
    removePopup( ev.target )
  } )

  return popup
}

function changeVolume( newValue = null )
{
  if ( newValue !== null )
    CURRENT_VOLUME = newValue
  
  $( "#volume" ).val( CURRENT_VOLUME )
  player.setVolume( CURRENT_VOLUME )
}