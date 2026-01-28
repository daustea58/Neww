// Music player with YouTube embed and localStorage persistence

let player;
let isMusicPlaying = false;

function initMusic() {
    // Check if music was already initialized
    const musicState = localStorage.getItem('musicState');
    
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API callback
window.onYouTubeIframeAPIReady = function() {
    const musicState = localStorage.getItem('musicState');
    const currentTime = parseFloat(localStorage.getItem('musicTime')) || 0;
    
    player = new YT.Player('musicPlayer', {
        height: '0',
        width: '0',
        videoId: 'RvA3q0ZU-NQ', // Perfect - Ed Sheeran
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            start: Math.floor(currentTime)
        },
        events: {
            onReady: function(event) {
                if (musicState !== 'muted') {
                    event.target.playVideo();
                    isMusicPlaying = true;
                    updateMusicIcon();
                } else {
                    event.target.pauseVideo();
                    isMusicPlaying = false;
                    updateMusicIcon();
                }
            },
            onStateChange: function(event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    // Save time periodically
                    setInterval(saveCurrentTime, 2000);
                }
            }
        }
    });
    
    // Setup music toggle button
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
};

function toggleMusic() {
    if (!player) return;
    
    if (isMusicPlaying) {
        player.pauseVideo();
        isMusicPlaying = false;
        localStorage.setItem('musicState', 'muted');
    } else {
        player.playVideo();
        isMusicPlaying = true;
        localStorage.setItem('musicState', 'playing');
    }
    
    updateMusicIcon();
}

function updateMusicIcon() {
    const musicIcon = document.getElementById('musicIcon');
    if (musicIcon) {
        musicIcon.textContent = isMusicPlaying ? '🔊' : '🔇';
    }
}

function saveCurrentTime() {
    if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        localStorage.setItem('musicTime', currentTime);
    }
}

function continueMusic() {
    const musicState = localStorage.getItem('musicState');
    
    if (!player && typeof YT !== 'undefined' && YT.Player) {
        const currentTime = parseFloat(localStorage.getItem('musicTime')) || 0;
        
        player = new YT.Player('musicPlayer', {
            height: '0',
            width: '0',
            videoId: 'RvA3q0ZU-NQ',
            playerVars: {
                autoplay: musicState !== 'muted' ? 1 : 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                playsinline: 1,
                start: Math.floor(currentTime)
            },
            events: {
                onReady: function(event) {
                    if (musicState !== 'muted') {
                        event.target.playVideo();
                        isMusicPlaying = true;
                    } else {
                        isMusicPlaying = false;
                    }
                    updateMusicIcon();
                }
            }
        });
    } else if (player) {
        if (musicState !== 'muted' && !isMusicPlaying) {
            player.playVideo();
            isMusicPlaying = true;
        }
        updateMusicIcon();
    }
    
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle && !musicToggle.onclick) {
        musicToggle.addEventListener('click', toggleMusic);
    }
}

// Add music player div if not exists
window.addEventListener('load', function() {
    if (!document.getElementById('musicPlayer')) {
        const musicDiv = document.createElement('div');
        musicDiv.id = 'musicPlayer';
        musicDiv.style.display = 'none';
        document.body.appendChild(musicDiv);
    }
});
