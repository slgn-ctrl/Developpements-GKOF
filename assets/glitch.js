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

  /* Intro boot sequence — dismisses on its own, or on any interaction */
  const boot = document.getElementById('introBoot');
  if (boot) {
    const dismiss = () => boot.classList.add('hide');
    const autoTimer = setTimeout(dismiss, reduceMotion ? 0 : 1500);
    const skip = () => { clearTimeout(autoTimer); dismiss(); };
    boot.addEventListener('click', skip);
    document.addEventListener('keydown', skip, { once: true });
  }

  /* REC timestamp, ticks up like a camcorder counter */
  const timerEl = document.getElementById('recTimer');
  if (timerEl) {
    let seconds = 0;
    setInterval(() => {
      seconds++;
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      timerEl.textContent = `REC ${m}:${s}`;
    }, 1000);
  }

  /* Random full-page glitch bursts */
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

  /* Occasional tracking-loss sweep drifting down the page */
  const sweep = document.querySelector('.tracking-sweep');
  if (sweep && !reduceMotion) {
    const runSweep = () => {
      sweep.classList.remove('run');
      void sweep.offsetWidth;
      sweep.classList.add('run');
      setTimeout(runSweep, 7000 + Math.random() * 11000);
    };
    setTimeout(runSweep, 3200);
  }

  /* Text-scramble on hover for nav links and buttons */
  if (!reduceMotion) {
    const glitchChars = '!<>-_\\/[]{}=+*^?#01';
    const attachScramble = (el) => {
      const original = el.textContent;
      let frame = null;
      el.addEventListener('mouseenter', () => {
        let iterations = 0;
        clearInterval(frame);
        frame = setInterval(() => {
          el.textContent = original
            .split('')
            .map((ch, i) => {
              if (ch === ' ') return ch;
              if (i < iterations) return original[i];
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
          iterations += original.length / 8;
          if (iterations >= original.length) {
            clearInterval(frame);
            el.textContent = original;
          }
        }, 30);
      });
      el.addEventListener('mouseleave', () => {
        clearInterval(frame);
        el.textContent = original;
      });
    };
    document.querySelectorAll('.main-nav a, .btn').forEach(attachScramble);
  }

  /* Background tape (music) — plays automatically, button only stops/restarts it */
  const audio = document.getElementById('bgm');
  const playBtn = document.getElementById('tapePlay');

  if (audio && playBtn) {
    audio.volume = 0.35;

    const setPlayingUI = (isPlaying) => {
      document.body.classList.toggle('playing', isPlaying);
      playBtn.textContent = isPlaying ? '❚❚' : '►';
      playBtn.setAttribute('aria-label', isPlaying ? 'Couper la musique' : 'Relancer la musique');
    };

    const tryPlay = () => audio.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));

    // Attempt autoplay immediately
    tryPlay();

    // Browsers that block autoplay with sound: start on the very first
    // interaction anywhere on the page, no extra prompt needed
    const resumeOnGesture = () => tryPlay();
    document.addEventListener('click', resumeOnGesture, { once: true });
    document.addEventListener('keydown', resumeOnGesture, { once: true });
    document.addEventListener('touchstart', resumeOnGesture, { once: true });

    // The deck button only ever stops or restarts playback explicitly
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
