/* =========================
   GKOF SYSTEM
========================= */

console.log(`
====================================
        GKOF // SYSTEM
   GORILLA KING OF FEAR
====================================
        SYSTEM ONLINE
====================================
`);


/* =========================
   RANDOM GLITCH
========================= */

const glitchElements =
    document.querySelectorAll(".glitch");


function randomGlitch() {

    glitchElements.forEach((element) => {

        if (Math.random() > 0.55) {

            const x =
                Math.random() * 10 - 5;

            element.style.transform =
                `translateX(${x}px)`;

            setTimeout(() => {

                element.style.transform =
                    "translateX(0)";

            }, 80);

        }

    });

}


setInterval(randomGlitch, 1200);