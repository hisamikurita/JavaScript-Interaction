//x成分とy成分を持つ二次元ベクトル
export class Vector2 {
    /**
     * コンストラクター
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * ベクトルのxとyをセットする
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * ベクトルの複製
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    /**
     * ベクトルの足し算 : 渡されたベクトルのxとyを自分に足す
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * ベクトルの引き算 : 渡されたベクトルのxとyを自分から引く
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * ベクトルの乗算
     */
    mult(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    multScalar(v) {
        this.x *= v;
        this.y *= v;
        return this;
    }
    /**
     * ベクトルの大きさ
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * ベクトルの単位化
     */
    normalized() {
        let magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= magnitude;
        this.y /= magnitude;
    }
    /**
     * ベクトルの向きを変更して速度を乗算する
     */
    setFromScalarAngle(scalar, angle) {
        this.x = Math.cos(angle) * scalar;
        this.y = Math.sin(angle) * scalar;
    }
    distanceToSquared(v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
}