const audio = document.getElementById("bgMusic");
const toggle = document.getElementById("audioToggle");
const icon = document.getElementById("audioIcon");
const time = document.querySelector(".vhs-time");

let started = false;

function updateAudioUI() {
  if (audio.paused) {
    icon.textContent = "▶";
    toggle.innerHTML = '<span id="audioIcon">▶</span> AUDIO';
  } else {
    icon.textContent = "Ⅱ";
    toggle.innerHTML = '<span id="audioIcon">Ⅱ</span> AUDIO';
  }
}

async function startMusic() {
  try {
    audio.volume = 0.35;
    await audio.play();
    started = true;
    updateAudioUI();
  } catch (e) {
    // Browsers can block autoplay until a user gesture.
  }
}

toggle.addEventListener("click", async () => {
  if (audio.paused) await startMusic();
  else audio.pause();
  updateAudioUI();
});

document.addEventListener("pointerdown", () => {
  if (!started) startMusic();
}, { once: true });

setInterval(() => {
  const t = Math.floor(audio.currentTime || 0);
  const hh = String(Math.floor(t / 3600)).padStart(2, "0");
  const mm = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");
  time.textContent = `PLAY ● SP ${hh}:${mm}:${ss}`;
}, 500);

// Small random VHS displacement on sections.
setInterval(() => {
  if (Math.random() > 0.84) {
    document.body.style.transform = `translateX(${(Math.random() - .5) * 3}px)`;
    setTimeout(() => document.body.style.transform = "", 70);
  }
}, 900);
