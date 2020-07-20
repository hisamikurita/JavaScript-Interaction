'use strict';

{
    window.onload = function () {
        const canvas = document.querySelector('canvas');
        if (typeof canvas.getContext === 'undefined') {
            return;
        }
        const ctx = canvas.getContext("2d");

        function fitCanvasSize() {

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

        }
        fitCanvasSize();
        window.onresize = fitCanvasSize;

        (function () {
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        var mouse = {
            x: undefined,
            y: undefined
        }

        if (window.matchMedia("(min-width: 400px)").matches) {
            var maxRadius = 40;
        } else {
            var maxRadius = 24;
        }

        var colorArray = [
            '#2B3880',
            '#A3B1FF',
            '#5770FF',
            '#4F588A',
            '#455ACC'
        ]

        window.addEventListener('mousemove',
            function () {
                mouse.x = event.x;
                mouse.y = event.y;
            })

        function Circle(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.minRadius = radius;
            this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

            this.draw = function () {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            };

            this.update = function () {

                if (this.x + radius > canvas.width || this.x - radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + radius > canvas.height || this.y - radius < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                //interctivitity
                if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                    this.radius += 1;
                    if (this.radius > maxRadius) {
                        this.radius -= 1;
                    }
                } else if (this.radius > this.minRadius) {
                    this.radius -= 1;
                }

                this.draw();

            }
        }

        var circleArray = [];

        for (var i = 0; i < 800; i++) {
            var x = Math.random() * (canvas.width - radius * 2) + radius;
            var dx = (Math.random() - 0.5);
            var y = Math.random() * (canvas.height - radius * 2) + radius;
            var dy = (Math.random() - 0.5);
            var radius = Math.random() * 3 + 1;
            circleArray.push(new Circle(x, y, dx, dy, radius));
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].update();
            }

        }
        animate();
    }
}

