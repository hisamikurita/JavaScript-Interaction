import { Particle } from './particle';
import { Utils } from './util';

window.onload = function () {

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        colors = ["#0952BD", "#A5BFF0", "#118CD6", "#1AAEE8", "#F2E8C9"];

    //リサイズイベント
    window.onresize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(
            Math.random() * width,
            Math.random() * height,
            10,
            Utils.randomColor(colors),
            // Math.random() * 1,
        ))
        particles[i].mousemove();
    }

    render();
    function render() {
        ctx.fillStyle = 'hsla(260,40%,5%,.2)';
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            var p = particles[i]
            p.update();
            p.draw();
        }
        requestAnimationFrame(render);
    }
}
