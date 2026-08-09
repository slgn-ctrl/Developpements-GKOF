const audio=document.getElementById("music");
const boot=document.getElementById("boot");
const sound=document.getElementById("sound");
let playing=false;

audio.volume=.42;

async function playMusic(){
  try{
    await audio.play();
    playing=true;
    sound.classList.remove("off");
  }catch(e){
    // Browser autoplay policy may block audible autoplay.
    playing=false;
    sound.classList.add("off");
  }
}

window.addEventListener("load",()=>{
  setTimeout(()=>boot.classList.add("hide"),2600);
  playMusic();
});

sound.addEventListener("click",async()=>{
  if(audio.paused){await playMusic()}else{audio.pause();playing=false;sound.classList.add("off")}
});

// If autoplay is blocked, the first interaction starts the music.
document.addEventListener("pointerdown",()=>{
  if(audio.paused) playMusic();
},{once:true});

const dot=document.querySelector(".cursor-dot");
window.addEventListener("pointermove",e=>{
  dot.style.left=e.clientX+"px";
  dot.style.top=e.clientY+"px";
});

document.querySelectorAll("a,button").forEach(el=>{
  el.addEventListener("mouseenter",()=>dot.style.transform="translate(-50%,-50%) scale(4)");
  el.addEventListener("mouseleave",()=>dot.style.transform="translate(-50%,-50%) scale(1)");
});

// Occasional VHS tracking jump.
setInterval(()=>{
  if(Math.random()>.72){
    document.body.classList.add("tracking");
    setTimeout(()=>document.body.classList.remove("tracking"),70+Math.random()*100);
  }
},1100);
