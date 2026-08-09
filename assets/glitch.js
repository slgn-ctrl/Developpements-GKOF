// GORILLA KING OF FEAR — signal control script

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '[ X ]' : '[ MENU ]';
    });
  }

  /* Random glitch bursts across the page */
  if (!reduceMotion) {
    const scheduleBurst = () => {
      const delay = 4000 + Math.random() * 9000;
      setTimeout(() => {
        document.body.classList.add('glitch-burst');
        setTimeout(() => document.body.classList.remove('glitch-burst'), 220);
        scheduleBurst();
      }, delay);
    };
    scheduleBurst();
  }

  /* Background tape (music) */
  const audio = document.getElementById('bgm');
  const playBtn = document.getElementById('tapePlay');
  const STORAGE_KEY = 'gkof-tape-playing';

  if (audio && playBtn) {
    audio.volume = 0.35;

    const setPlayingUI = (isPlaying) => {
      document.body.classList.toggle('playing', isPlaying);
      playBtn.textContent = isPlaying ? '❚❚' : '►';
      playBtn.setAttribute('aria-label', isPlaying ? 'Mettre en pause la musique' : 'Lancer la musique');
    };

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          setPlayingUI(true);
          localStorage.setItem(STORAGE_KEY, '1');
        }).catch(() => {});
      } else {
        audio.pause();
        setPlayingUI(false);
        localStorage.setItem(STORAGE_KEY, '0');
      }
    });

    // Resume across page navigation if the visitor already opted in
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      audio.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
    } else {
      setPlayingUI(false);
    }
  }
});
