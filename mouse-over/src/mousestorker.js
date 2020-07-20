import { Mouse } from './mouse';

const cursor = new Mouse();
window.addEventListener('mousemove', (e) => {
    cursor.mousemove(e);
})

//マウスストーカークラスを作成
export class mouseStorker {
    constructor(elmId) {
        this.elm = document.getElementById(elmId);
        this.elmWidth = this.elm.clientWidth;
        this.elmHeight = this.elm.clientHeight;
        this.height = window.innerHeight;
        this.pos = {
            x: 0,
            y: 0,
        };
        this.friction = .2;
    }
    update() {
        TweenMax.to({}, .001, {
            repeat: -1,
            onRepeat: () => {
                this.pos.x += (cursor.mouse.x - this.pos.x) * this.friction;
                this.pos.y += (cursor.mouse.y - this.pos.y) * this.friction;
                TweenMax.set(this.elm, {
                    x: this.pos.x - this.elmWidth / 2,
                    y: this.pos.y - this.elmHeight / 2,
                })
                if (this.pos.y <= 0 + this.elmHeight / 4 || this.pos.y >= this.height - this.elmHeight / 4) {
                    TweenMax.to(this.elm, .2, {
                        opacity: 0,
                        scale: 2.6,
                    })
                }
                else {
                    TweenMax.to(this.elm, .2, {
                        opacity: 1,
                        scale: 1,
                    })
                }
            }
        })
    }
}