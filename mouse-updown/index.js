const point = document.getElementById('circle');
const pointHalfWidth = point.clientWidth / 2;
const pointHalfHeight = point.clientHeight / 2;
const startTime = Date.now();
let scaleNum = 0;
let time = 0;
let animeExpansion = null;
let animeReduction = null;

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX - pointHalfWidth;
    const posY = e.clientY - pointHalfHeight;
    gsap.to(point, {
        duration: .06,
        ease: "none",
        x: posX,
        y: posY
    });
});

window.addEventListener('mousedown', () => {
    if (animeReduction) {
        animeReduction.kill();
    }
    animeExpansion = gsap.to({}, {
        duration: .01,
        repeat: -1,
        onRepeat: () => {
            time += .2;
            gsap.to(point, {
                duration: 1,
                ease: "power2.out",
                scale: time,
            });
        }
    });
});

window.addEventListener('mouseup', () => {
    if (animeExpansion) {
        animeExpansion.kill();
    }
    animeReduction = gsap.to({}, {
        duration: .01,
        repeat: -1,
        onRepeat: () => {
            if (time >= 0) {
                time += -.2;
                gsap.to(point, {
                    duration: 1,
                    ease: "power2.out",
                    scale: time,
                });
            }
        }
    });
});