// GORILLA KING OF FEAR — signal script

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? 'Close' : 'Menu';
    });
  }

  /* The one recurring event on the page: a brief signal drop.
     Flickers the hero title split and inverts the waveform for a beat,
     then it's gone. Rare enough to read as an event, not a loop. */
  const signalValue = document.getElementById('signalValue');
  const readouts = ['0.8m', '—', '1.2m', 'holding', '0.4m', 'lost'];

  if (!reduceMotion) {
    const scheduleDrop = () => {
      const delay = 6000 + Math.random() * 10000;
      setTimeout(() => {
        document.body.classList.add('signal-drop');
        if (signalValue) signalValue.textContent = readouts[Math.floor(Math.random() * readouts.length)];
        setTimeout(() => document.body.classList.remove('signal-drop'), 130);
        scheduleDrop();
      }, delay);
    };
    scheduleDrop();
  }

  /* Background tape (music) — plays automatically. The button only
     ever stops or restarts it explicitly, nothing else controls it. */
  const audio = document.getElementById('bgm');
  const playBtn = document.getElementById('tapePlay');

  if (audio && playBtn) {
    audio.volume = 0.32;

    const setPlayingUI = (isPlaying) => {
      document.body.classList.toggle('playing', isPlaying);
      playBtn.textContent = isPlaying ? '❚❚' : '►';
      playBtn.setAttribute('aria-label', isPlaying ? 'Stop music' : 'Restart music');
    };

    const tryPlay = () => audio.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));

    tryPlay();

    // If the browser blocked autoplay with sound, start on the very
    // first interaction anywhere on the page — no prompt needed.
    const resumeOnGesture = () => tryPlay();
    document.addEventListener('click', resumeOnGesture, { once: true });
    document.addEventListener('keydown', resumeOnGesture, { once: true });
    document.addEventListener('touchstart', resumeOnGesture, { once: true });

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        tryPlay();
      } else {
        audio.pause();
        setPlayingUI(false);
      }
    });
  }
});
