const img = document.getElementById('img');
const rect = img.getBoundingClientRect();
const force = 60;

img.addEventListener('mousemove', (e) => {
    const x = ((e.clientX - rect.left) / rect.width - .5) * force;
    const y = ((e.clientY - rect.top) / rect.height - .5) * force;

    gsap.to(img, {
        duration: 1.0,
        ease: "power2out",
        x: x,
        y: y,
        rotationY: -x * .5,
    });
});

img.addEventListener('mouseout', () => {
    gsap.to(img, {
        duration: 1.0,
        ease: "power2.out",
        x: 0,
        y: 0,
        rotationY: 0,
    });
})