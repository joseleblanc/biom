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

// --- NOVO CÓDIGO AQUI ---
// Detecta quando o usuário sai ou volta para a aba/página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Se a página ficou oculta, pausa a música (sem aplicar a classe 'manually-paused')
        if (!music.paused) {
            pauseMusic();
        }
    } else {
        // Quando o usuário volta, só dá play se ele já passou pelo overlay E se não pausou manualmente antes
        const jaEntrou = welcomeOverlay.classList.contains('hidden');
        const pausadoManualmente = musicToggle.classList.contains('manually-paused');
        
        if (jaEntrou && !pausadoManualmente && music.paused) {
            playMusic();
        }
    }
});










