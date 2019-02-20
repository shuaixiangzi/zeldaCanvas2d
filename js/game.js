(function () {

    /**
     * 变量定义
     * bgReady,bgImage 背景是否加载完成,背景图片
     * heroReady,heroImage 英雄相关参数
     * monsterReady,monsterImage 怪物相关参数
     * hero 英雄相关参数
     * monster 怪物相关参数
     * monsterCaught
     */

    let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        bgReady,
        bgImage,
        heroReady,
        heroImage,
        monsterReady,
        monsterImage,
        hero,
        monster,
        monsterCaught,
        keysDown,
        reset,
        update,
        render,
        main,
        w,
        then;

    canvas.width = 512;
    canvas.height = 480;
    document.body.appendChild(canvas);

    // 背景图片问题
    bgReady = false;
    bgImage = new Image();

    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = './img/games/background.png';

    // 英雄图片
    heroReady = false;
    heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };

    heroImage.src = './img/games/hero.png';


    // 怪物图片
    monsterReady = false;
    monsterImage = new Image();
    monsterImage.onload = function () {
        monsterReady = true;
    };

    monsterImage.src = './img/games/monster.png';

    // 游戏对象
    hero = {
        speed: 256  //移动速度
    };

    monster = {};
    monsterCaught = 0;

    //键盘操作事件
    keysDown = {};

    addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    },false);

    addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    },false);

    //初始化方法
    reset = function () {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;

        monster.x = 32 + (Math.random() * (canvas.width -64));
        monster.y = 32 + (Math.random() * (canvas.width -64));
    };

    //更新游戏状态
    update = function (modifier) {
        if (38 in keysDown) {
            hero.y -= hero.speed *modifier;
        }
        if (40 in keysDown) {
            hero.y += hero.speed *modifier;
        }
        if (37 in keysDown) {
            hero.x -= hero.speed *modifier;
        }
        if (39 in keysDown) {
            hero.x += hero.speed *modifier;
        }

        //判断英雄和怪物是否相遇
        if(
            hero.x <= (monster.x +31)
            && monster.x <= (hero.x + 31)
            && hero.y <= (monster.y +32)
            && monster.y <= (hero.y +32)
        ){
            ++monsterCaught;
            reset();
        }
    };

    // 绘制渲染
    render = function () {
        if(bgReady){
            ctx.drawImage(bgImage,0,0);
        }

        if(heroReady){
            ctx.drawImage(heroImage, hero.x, hero.y);
        }

        if(monsterReady){
            ctx.drawImage(monsterImage, monster.x, monster.y);
        }

        // 分数
        ctx.fillStyle = 'rgb(250,250,250)';
        ctx.font = '24px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('Goblins caught:' + monsterCaught, 32, 32);
    };

    //主循环
    main = function () {
        let now = Date.now();
        let delta = now - then;

        update(delta / 1000);
        render();

        then = now;

        requestAnimationFrame(main);
    };

    w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    then = Date.now();
    reset();
    main();

})();
