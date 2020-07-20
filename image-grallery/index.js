window.addEventListener('load', () => {
    //mousestorker
    const circle = document.getElementById('circle');
    const pointwrap = document.getElementById('point');
    const canvas = document.getElementById('canvas');
    canvas.width *= devicePixelRatio;
    canvas.height *= devicePixelRatio;
    canvas.style.width = String(canvas.width / devicePixelRatio) + "px";
    canvas.style.height = String(canvas.height / devicePixelRatio) + "px";
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const circleWidth = circle.clientWidth;
    const circleHeight = circle.clientHeight;
    const pointwrapWidth = pointwrap.clientWidth;
    const pointwrapHeight = pointwrap.clientHeight;
    let circleTween;
    let mouse = {
        x: 0,
        y: 0,
    };
    let circlePos = {
        x: 0,
        y: 0,
    };
    let pointwrapPos = {
        x: 0,
        y: 0,
    };
    const friction = .2;

    let point = function (r, degree) {
        this.x = 0;
        this.y = 0;
        this.radian = degree * (Math.PI / 180);
        this.radius = r;
        this.speed = Math.random() * 10 + 5;
        this.sin = 0;
        this.cos = 0;
        this.r = Math.random() + .4;
        this.degree = 0;
        this.draw = function () {
            ctx.beginPath();

            this.xc1 = (pointArray[0].x + pointArray[max - 1].x) / 2;
            this.yc1 = (pointArray[0].y + pointArray[max - 1].y) / 2;

            ctx.moveTo(this.xc1, this.yc1);

            for (var i = 0; i < max - 1; i++) {
                this.xc = (pointArray[i].x + pointArray[i + 1].x) / 2;
                this.yc = (pointArray[i].y + pointArray[i + 1].y) / 2;
                ctx.quadraticCurveTo(pointArray[i].x, pointArray[i].y, this.xc, this.yc)
            }
            ctx.quadraticCurveTo(pointArray[i].x, pointArray[i].y, this.xc1, this.yc1);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.closePath();
        }
        this.update = function () {
            this.plus = Math.cos(this.degree * (Math.PI / 180)) * this.r;
            this.radius += this.plus;
            this.cos = Math.cos(this.radian) * this.radius;
            this.sin = Math.sin(this.radian) * this.radius;
            this.x = this.cos + centerX;
            this.y = this.sin + centerY;

            this.degree += this.speed;
            if (this.degree > 360) { this.degree -= 360; };
        }
    }

    let max = 10;
    let pointArray = [];
    let degree = 360 / max;
    let RADIUS = 60;
    let FPS = 20;
    let anime;
    for (let i = 0; i < max; i++) {
        pointArray.push(new point(RADIUS, degree * i));
    }

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })

    anime = setInterval(render, 1000 / FPS)

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < max; i++) {
            pointArray[i].update();
            pointArray[i].draw();
        }
    }

    pointDraw();
    function pointDraw() {
        TweenMax.to({}, .001, {
            repeat: -1,
            onRepeat: function () {
                pointwrapPos.x = mouse.x;
                pointwrapPos.y = mouse.y;
                TweenMax.set(pointwrap, {
                    left: pointwrapPos.x - pointwrapWidth / 2,
                    top: pointwrapPos.y - pointwrapHeight / 2,
                })
            }
        })
    }

    circleDraw();
    function circleDraw() {
        circleTween = TweenMax.to({}, .001, {
            repeat: -1,
            onRepeat: function () {
                circlePos.x += (mouse.x - circlePos.x) * friction;
                circlePos.y += (mouse.y - circlePos.y) * friction;
                TweenMax.set(circle, {
                    left: circlePos.x - circleWidth / 2,
                    top: circlePos.y - circleHeight / 2,
                })
                if (circlePos.y <= 0 + circleHeight / 4 || circlePos.y >= height - circleHeight / 4) {
                    TweenMax.to(circle, .2, {
                        opacity: 0,
                        scale: 2.6,
                    })
                }
                else {
                    TweenMax.to(circle, .2, {
                        opacity: 1,
                        scale: 1,
                    })
                }
            }
        })
    }

    const slide = document.getElementsByClassName('slide');
    const bullet = document.getElementsByClassName('bullet_circle');
    const next = document.getElementById('next-btn');
    const prev = document.getElementById('prev-btn');
    const btn = document.getElementsByClassName('btn');
    let currentnum = 0;
    slide[currentnum].classList.add('active');

    //bulletbtn
    [...bullet].forEach((bulletelm, index) => {
        bulletelm.addEventListener('click', (e) => {
            coverAnime();
            setTimeout(slideClass, 600, index);
            bulletClass(e);
        })
    });

    //nextbtn
    next.addEventListener('click', (e) => {
        coverAnime();
        if (currentnum > slide.length - 2) {
            currentnum = 0;
        }
        else {
            currentnum++;
        }
        arrowBulletClass(currentnum);
        setTimeout(arrowSlideClass, 600, currentnum);
    });

    //prevbtn
    prev.addEventListener('click', (e) => {
        coverAnime();
        if (currentnum < 1) {
            currentnum = slide.length - 1;
        }
        else {
            currentnum--;
        }
        arrowBulletClass(currentnum);
        setTimeout(arrowSlideClass, 600, currentnum);
    });

    //クラス管理
    function slideClass(index) {
        [...slide].forEach((slideelm) => {
            slideelm.classList.remove('active');
        });
        currentnum = index;
        slide[currentnum].classList.add('active');
    };
    function bulletClass(e) {
        [...bullet].forEach((bulletelm) => {
            bulletelm.classList.remove('active');
        });
        e.target.classList.add('active');
    };
    function arrowSlideClass(num) {
        [...slide].forEach((slideelm) => {
            slideelm.classList.remove('active');
        });
        slide[num].classList.add('active');
    };
    function arrowBulletClass(num) {
        [...bullet].forEach((bulletelm) => {
            bulletelm.classList.remove('active');
        });
        bullet[num].classList.add('active');
    };

    //ホバーアニメーション
    [...slide].forEach((elm) => {
        elm.addEventListener('mouseover', (e) => {

            TweenMax.to(e.currentTarget.children, .6,
                {
                    scale: 1.1,
                    // filter: 'grayscale(.8)',
                },
            );
            TweenMax.to(point, .4,
                {
                    scale: 16,
                    mixBlendMode: 'overlay',
                }
            );
        });
        elm.addEventListener('mouseleave', (e) => {
            TweenMax.to(e.currentTarget.children, .6,
                {
                    scale: 1,
                    // filter: 'grayscale(0)',
                },
            );
            TweenMax.to(point, .4,
                {
                    scale: 1,
                    mixBlendMode: 'normal',
                }
            );
        });
    });

    //カバーアニメーション
    function coverAnime() {
        //ボタン全部を無効化
        [...btn].forEach((elm) => {
            elm.style.pointerEvents = 'none';
        });
        TweenMax.fromTo('#slide-anime', .6,
            {
                transformOrigin: 'left',
                scaleX: 0,
            },
            {
                scaleX: 1,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to('#slide-anime', .6,
                        {
                            transformOrigin: 'right',
                            scaleX: 0,
                            ease: Power2.easeOut,
                            onComplete: function () {
                                //ボタン全部を有効化
                                [...btn].forEach((elm) => {
                                    elm.style.pointerEvents = 'auto';
                                })
                            }
                        }
                    );
                }
            },
        );
    };
})
