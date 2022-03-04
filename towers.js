class Student {
    static price = 250;
    
    constructor(color, position) {
        this.color = color;
        this.rateOfFire = 50;
        this.damage = 50;
        this.position = position;
        this.image = new Image();
        this.image.src = "Images/student.png";
        this.range = 100;
        this.width = 50;
        this.height = 50;
        this.canShoot = true;
        this.enemiesInRange = [];
        this.projectiles = [];
    }

    update() {
        if (this.projectiles.length > 2) this.canShoot = false;
        else this.canShoot = true;
        this.projectiles.forEach((projectile, i) => {
            enemies.forEach(enemy => {
                if (projectile.position.x >= enemy.position.x && projectile.position.x <= enemy.position.x+enemy.width && 
                    projectile.position.y >= enemy.position.y && projectile.position.y <= enemy.position.y + enemy.height) {
                        enemy.hp -= this.damage;
                        this.projectiles.splice(i, 1);
                    }
            });
            if(projectile.position.x < 0 || projectile.position.x > canvas.width-toolbar.width || projectile.position.y < 0 || projectile.position.y > canvas.height) {
                this.projectiles.splice(i, 1);
            }
            projectile.position.x += projectile.vx;
            projectile.position.y += projectile.vy;
            rect(projectile.position.x, projectile.position.y, 10, 10, "black");
        });
    }

    draw() {
        circle(this.position.x+this.width/2, this.position.y+this.height/2, this.range, "rgba(100, 100, 100, 0.3)");
        drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    shoot(x, y) {
        let vx = -(this.position.x - x)/10;
        let vy = -(this.position.y - y)/10;
        this.projectiles.push({position: {x: this.position.x, y: this.position.y}, target: {x, y}, vx, vy});
    }
}

let students = [];

function spawnStudent(x, y) {
    students.push(new Student("gray", {x, y}));
}

class Coach {
    static price = 1500;
    constructor(color, position) {
        this.color = color;
        this.rateOfFire = 50;
        this.damage = 25;
        this.position = position;
        this.image = new Image();
        this.images = "Images/Munoz/Pose";
        this.pose = 1;
        this.range = 100;
        this.atkRange = 0;
        this.width = 50;
        this.height = 50;
        this.canShoot = true;
        this.enemiesInRange = [];
        this.projectiles = [];
    }

    animate() {
        this.attacking = true;
        let int = setInterval(() => {
            this.pose += 1;
            if (this.pose == 4) this.pose = 1;
            if (this.pose == 1) {
                clearInterval(int);
                let i = setInterval(() => {
                    this.atkRange++;
                    if (this.atkRange >= 100) {
                        clearInterval(i);
                        this.atkRange = 0;
                    }
                }, 1);
                this.attacking = false;
            }
        }, 100);
    }

    draw() {
        console.log(this.atkRange);
        circle(this.position.x+this.width/2, this.position.y+this.height/2, this.atkRange, "rgba(100, 100, 100, 0.3)");
        this.image.src = this.images + this.pose + ".png";
        drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

let coaches = [];

function spawnCoach(x, y) {
    coaches.push(new Coach("gray", {x, y}));
}

class Farm {
    static price = 1000;
    
    constructor(color, position) {
        this.color = color;
        this.position = position;
        this.image = new Image();
        this.image.src = "Images/RiceFarm/type1.png";
        this.width = 50;
        this.height = 50;
    }

    draw() {
        if (frame%100 == 0) money += 25;
        drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

let farms = [];

function spawnFarm(x, y) {
    farms.push(new Farm("gray", {x, y}));
}