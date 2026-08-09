/* =========================
   GKOF // SYSTEM
========================= */

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1900);

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});


/* =========================
   CURSOR HOVER
========================= */

const links = document.querySelectorAll("a, button");

links.forEach(link => {

    link.addEventListener("mouseenter", () => {

        cursor.style.width = "30px";
        cursor.style.height = "30px";

    });

    link.addEventListener("mouseleave", () => {

        cursor.style.width = "10px";
        cursor.style.height = "10px";

    });

});


/* =========================
   RANDOM GLITCH
========================= */

const glitch = document.querySelector(".glitch");

setInterval(() => {

    if (Math.random() > .55) {

        const x =
            Math.random() * 12 - 6;

        glitch.style.transform =
            `translateX(${x}px)`;

        setTimeout(() => {

            glitch.style.transform =
                "translateX(0)";

        }, 90);

    }

}, 900);


/* =========================
   CONSOLE
========================= */

console.log(`
╔══════════════════════════════╗
║       GKOF // SYSTEM         ║
║   GORILLA KING OF FEAR       ║
╠══════════════════════════════╣
║ STATUS : ONLINE              ║
║ ACCESS : GRANTED              ║
╚══════════════════════════════╝
`);
