const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const welcomeOverlay = document.getElementById('welcome-overlay');
const enterBtn = document.getElementById('enter-btn');

// Remove o painel translúcido e dispara a música
enterBtn.addEventListener('click', () => {
    welcomeOverlay.classList.add('hidden');
    
    if (music.paused && !musicToggle.classList.contains('manually-paused')) {
        playMusic();
    }
});

// Controle manual de alternância (Play/Pause)
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (music.paused) {
        playMusic();
        musicToggle.classList.remove('manually-paused');
    } else {
        pauseMusic();
        musicToggle.classList.add('manually-paused');
    }
});

function playMusic() {
    music.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.className = "fas fa-pause";
    }).catch(error => {
        console.log("Autoplay retido pelo navegador. Aguardando interação.");
    });
}

function pauseMusic() {
    music.pause();
    musicToggle.classList.remove('playing');
    musicIcon.className = "fas fa-music";
}