class Enemy {
    constructor(x, y, xVel, yVel, type) {
        this.position = {x, y};
        this.velocity = {x: xVel, y: yVel};
        this.width = 40;
        this.dead = false;
        this.height = 50;
        this.type = type;
        this.price = type*10;
        this.ind = 1;
        this.image = new Image();
        this.speed = this.type+1;
        this.hp = this.type*100;
    }
    on(node) {
        return (node.x >= this.position.x && node.x <= this.position.x+this.width && 
                node.y >= this.position.y && node.y <= this.position.y + this.height);
    }
    update() {
        this.position.x += this.velocity.x*this.speed;
        this.position.y += this.velocity.y*this.speed;
    }
    draw(frame) {
        if(frame%10 == 0) this.ind == 1 ? this.ind = 2 : this.ind = 1;
        this.image.src = "Images/boss" + this.type + "/" + this.ind + ".png";
        drawImage(this.image, this.position.x, this.position.y, this.width*2, this.height*2, this.color);
    }
}

var enemies = [];

function spawnEnemy(x, y) {
    type = Math.ceil(Math.random()*7);
    enemies.push(new Enemy(x, y, 1, 0, type));
}