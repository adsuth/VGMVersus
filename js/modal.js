function modalEvents() {
  $("#help_close").click(() => {
    GAME_PAUSED = false
    $("#help_wrapper").fadeOut(200)
    resume_game()
  })

  $("#generator_close").click(() => {
    GAME_PAUSED = false
    $("#caption_message").html("")
    resetGeneratorData()
    $("#generator_wrapper").fadeOut(200)
    resume_game()
  })

  $("#btn_setSongs").click(() => {
    $("#btn_restart").html( "Restart" ) 
    $("#caption_message").html("")
    resetGeneratorData()
    $("#generator_wrapper").fadeOut(200)
    game_start()
    init_songs()
  })
  
  $("#settings_start").click(() => {
    GAME_PAUSED = false
    applySettings()
    hideSettings()
  })
  $("#settings_close").click(() => {
    GAME_PAUSED = false
    hideSettings()
    resume_game()
  })

  $("#songs_dir_generator").keydown(ev => {
    if (ev.keyCode === 13) {
      GAME_PAUSED = false
      applySettings()
      hideSettings()
    }
  })

  $(`#start_time_range`).change(ev => {
    $(`label[for="start_time"]`).text( `${ev.target.value}%` )
  })

  // prevent typing impossible values in number fields 
  $("#t_minutes").change(ev => {
    let aboveThreshold = ev.target.value > 9
    let belowThreshold = ev.target.value < 0
    let isNaN = ev.target.value !== ev.target.value

    if (isNaN) {
      ev.target.value = 0
    }
    if (aboveThreshold) {
      ev.target.value = 9
    }
    if (belowThreshold) {
      ev.target.value = 0
    }
  })
  $("#t_seconds").change(ev => {
    let aboveThreshold = ev.target.value > 59
    let belowThreshold = ev.target.value < 0
    let isNaN = ev.target.value !== ev.target.value

    if (isNaN) {
      ev.target.value = 0
    }
    if (aboveThreshold) {
      ev.target.value = 59
    }
    if (belowThreshold) {
      ev.target.value = 0
    }
  })
  $("#t_increment").change(ev => {
    let aboveThreshold = ev.target.value > 30
    let belowThreshold = ev.target.value < 0
    let isNaN = ev.target.value !== ev.target.value

    if (isNaN) {
      ev.target.value = 0
    }
    if (aboveThreshold) {
      ev.target.value = 30
    }
    if (belowThreshold) {
      ev.target.value = 0
    }
  })

  // prevent dragging numbers to bypass above
  $(".settings_number").on("dragstart", ev => {
    ev.preventDefault()
  })
}

function showSettings() {
  $("#settings_wrapper").fadeIn(200)
}

function hideSettings() {
  $("#settings_wrapper").fadeOut(200)
}