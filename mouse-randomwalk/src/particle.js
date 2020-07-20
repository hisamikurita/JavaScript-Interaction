import { Utils } from './util';
import { Vector2 } from './vector2';

export class Particle {
    constructor(x, y, radius, color, friction) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pos = new Vector2(x, y);
        this.radius = radius;
        this.friction = new Vector2(friction, friction);
        this.color = color;
        this.mouse = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
        this.vx = new Vector2(0, 0);
        this.num = Math.random() * 5 + 2;
    }
    update() {
        // マウスとパーティクルの位置関係からベクトルを作り単位化する
        this.vectorOfParticleToMouse = this.mouse.clone().sub(this.pos);
        this.vectorOfParticleToMouse.normalized();
        //値を小さくする
        this.vectorOfParticleToMouse.multScalar(.1);
        //進路方向ベクトルに値を加算して単位化する
        this.vx.add(this.vectorOfParticleToMouse);
        this.vx.normalized();
        this.pos.add(this.vx.clone().multScalar(this.num));
    }
    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.globalAlpha = '1'
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }
    mousemove() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.set(e.clientX, e.clientY);
        })
    }
}