export class Mouse {
    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
        }
    }
    mousemove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}