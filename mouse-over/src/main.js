import { mouseStorker } from './mousestorker';
import { Utils } from './util';
import { Mouse } from './mouse';


window.addEventListener('load', function () {

    //マウス座標を取得
    const cursor = new Mouse();
    window.addEventListener('mousemove', (e) => {
        cursor.mousemove(e);
    })

    //マウスストーカーを作成
    let mousestorker = new mouseStorker('circle');
    mousestorker.update();

    //スライダー
    const slider = document.getElementById('slider');
    let anime;
    let anime02;
    let pointX = 0;
    let dragX = 0;
    let saveX = 0;
    let friction = .04;
    let posX = 0;
    let eflag = false;

    slider.addEventListener('mousedown', mouseon);

    function mouseon(e) {
        e.preventDefault();
        eflag = true;
        pointX = e.clientX;
        window.addEventListener('mousemove', mousemove);
        anime = TweenMax.to({}, .001, {
            repeat: -1,
            onRepeat: () => {
                posX += (dragX - posX) * friction;
                anime02 = TweenMax.set(slider, {
                    x: posX,
                })
            }
        });
    }

    function mousemove(e) {
        if (eflag === true) {
            dragX = Utils.clamp(e.clientX - pointX + saveX, -980, 0);
            window.addEventListener('mouseup', mouseup);
        }
    }

    function mouseup(e) {
        e.preventDefault();
        eflag = false;
        saveX = dragX;
        window.removeEventListener('mousemove', mouseon);
        window.removeEventListener('mouseup', mouseup);
        setTimeout(pause, 1400);
        function pause() {
            anime.pause();
            anime02.pause();
        }
    }
})

