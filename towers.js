class Student {
    static price = 100;
    
    constructor(color, position) {
        this.color = color;
        this.rateOfFire = 50;
        this.damage = 100;
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
        drawImage(this.image, this.position.x, this.position.y, this.width, this.height, this.color);
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