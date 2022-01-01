// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
    random_init()

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        state.game.isEnding = false;
        clearSongData()
        timerResume()
    }
    else if (event.data == YT.PlayerState.CUED) {
        player.playVideo()
    }
    else if (event.data == YT.PlayerState.ENDED) {
        state.game.isEnding = true
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

function formatSongUrl( url ) {
    return url.slice( url.lastIndexOf("/") + 1, url.length )
}