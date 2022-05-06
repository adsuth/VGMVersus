var tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var player

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            // 'onError': onError,
            'onStateChange': onPlayerStateChange
        }
    })
}

function onError(ev) {
    if ( ev.data == 5 || ev.data == 101 ) {
        console.warn( `PlayerError: ${ev.data}\nsong index: ${song_current.index}\nname: ${song_current.name}\n(${song_current.url})`)
        cueNextSong()
    }
}

function playError() {
    console.warn( `PlayerError: N/A\nsong index: ${song_current.index}\nname: ${song_current.name}\n(${song_current.url})` )
    cueNextSong()
}

function onPlayerReady(event) {
    cueNextSong()
    player.playVideo()
}

function onPlayerStateChange(ev) {
    if ( ev.data == YT.PlayerState.CUED && player.getDuration() < 1 ) {
        // song is unavailable
        playError()
    }

    if (ev.data == YT.PlayerState.PLAYING) {
        timers[ CURRENT_PLAYER ].start()
        clearSongData()
    }
    else if (ev.data == YT.PlayerState.CUED) {
        timers[ CURRENT_PLAYER ].stop()
        player.playVideo()
    }
    else if ( ev.data == YT.PlayerState.PAUSED ) {
        timers[ CURRENT_PLAYER ].stop()
    }
    else if (ev.data == YT.PlayerState.ENDED) {
        timers[ CURRENT_PLAYER ].stop()
        updateSongData()
        window.setTimeout( cueNextSong, 1000 )
    }
}

function stopVideo() {
    player.stopVideo();
}

function updatePlayer( song ) {
    let formattedURL = formatSongUrl( song.url )
    player.loadVideoByUrl( formattedURL )
}

