window.onload = function () {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        x = width / 2 + 350;
        mouse = vector.create(x, height / 2),
        springPoint = vector.create(x, height / 2),
        weight = particle.create(x, height / 2, 50, Math.random() * Math.PI * 2);

    weight.radius = 60;
    weight.friction = .8;

    window.addEventListener('mousemove', function (e) {
        if (width / 2 - 350 <= event.clientX && event.clientX <= width / 2 + 350 && height / 2 - 233 <= event.clientY && event.clientY <= height / 2 + 233) {
            mouse.setX(event.clientX);
            mouse.setY(event.clientY);
        }
        else {
            mouse.setX(x);
            mouse.setY(height / 2);
        }
    })

    render();
    function render() {
        ctx.clearRect(0, 0, width, height);

        var distance = mouse.subtract(weight.position),
            springForce = distance.multiply(weight.friction).divide(20);

        weight.velocity.addTo(springForce);
        weight.update();

        ctx.beginPath();
        ctx.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ed2553'
        ctx.fill();

        ctx.font = "24px Arial,serif";
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff'
        ctx.fillText("button", weight.position.getX(), weight.position.getY() + 8);

        requestAnimationFrame(render);
    }
}