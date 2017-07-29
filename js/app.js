// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = Math.floor(Math.random() * 3) * 83 + 73;
    this.width = 101;
    this.height = 83;
    this.speed = Math.random() * 100 + 50;
};
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
        this.speed = Math.random() * 100 + 50;
        this.y = Math.floor(Math.random() * 3) * 83 + 73;
    }
};
// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 现在实现你自己的玩家类
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 405;
    this.width = 101;
    this.height = 83;
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update = function() {
    //边缘及终点检测
    if(this.x<0) this.x=0;
    if(this.x>404) this.x=404;
    if(this.y>405) this.y=405;
    if(this.y<73) this.y=405;
    //碰撞检测
    for(var i = 0 ; i < allEnemies.length ; i++){
        var bug = allEnemies[i];
        if(bug.x+bug.width>this.x && bug.y+bug.height>this.y && this.x+this.width>bug.x && this.y+this.height>bug.) {
            this.x = 202;
            this.y = 405;
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(allowedKeys) {
    console.log(allowedKeys);
    switch(allowedKeys){
        case 'left':
            this.x -= 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
for(var i=0; i<4; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
