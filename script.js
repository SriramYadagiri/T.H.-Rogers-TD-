const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let money = 450;

bg = new Image();
bg.src = "Images/bg.png";
var nodes = [];
nodes.push(new Node(50, canvas.height/2, {x: 0, y: 1}));
nodes.push(new Node(50, canvas.height*(3/4), {x: 1, y: 0}));
nodes.push(new Node(canvas.width-350, canvas.height*(3/4), {x: 0, y: -1}));
nodes.push(new Node(canvas.width-350, canvas.height*(1/4)-15, {x: -1, y: 0}));
nodes.push(new Node(50, canvas.height*(1/4)-15, {x: 0, y: 1}));
nodes.push(new Node(55, canvas.height/2-10, {x: -1, y: 0}, true));

toolBar = {x: canvas.width-300, y: 0, width: 300, height: canvas.height};

var frame = 0;

var cards = [];
cards.push(new Card("student", 850, 50, Student.price));

document.getElementById("play_game").onclick = () => {
    document.getElementById("ui").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    rect(toolBar.x, toolBar.y, toolBar.width, toolBar.height);
    setInterval(() => spawnEnemy(0, canvas.height/2), 1000);
    draw();
}

var selectedTower = null;
canvas.addEventListener("click", function(mouse) {
    console.log(money);
    if(mouseOn(mouse, toolBar)) {
        cards.forEach(card => {
            if(mouseOn(mouse, card)) {
                card.color = "white";
                setTimeout(() => card.color = "gray", 100);
                selectedTower = card.name;
            }
        });
    } else {
        if (selectedTower != null) {
            if (selectedTower == "student") {
                if (money - Student.price > 0) {
                    spawnStudent(mouse.offsetX, mouse.offsetY);
                    money -= Student.price;
                }
            }
        }
    }
});

function draw() {
    requestAnimationFrame(draw);
    frame++;
    ctx.clearRect(0, 0, canvas.width-toolBar.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width - toolBar.width, canvas.height);
    text("Money: "  + money, canvas.width-toolBar.width-100, 50);
    cards.forEach((card) => {
        card.draw();
    })
    enemies.forEach((enemy, ind) => {
        if(enemy.position.x < 0 || enemy.hp <= 0) enemies.splice(ind, 1);
        nodes.forEach((node) => {
            if (enemy.on(node)) {
                enemy.velocity = node.vel;
            }
        });
        enemy.update();
        enemy.draw(frame);
    });
    students.forEach(student => {
        student.update();
        enemies.forEach(enemy => {
            if(frame%10 == 0 && student.canShoot && circleRect(student.position.x+student.width/2, student.position.y+student.height/2, student.range, enemy.position.x, enemy.position.y, enemy.width, enemy.height)) {
                student.shoot(enemy.position.x+enemy.width/2+enemy.velocity.x*2, enemy.position.y+enemy.height/2+enemy.velocity.y*2);
            }
        });
        student.draw();
    })
    // nodes.forEach((node) => {
    //     node.draw();
    // });
}

function mouseOn(mouse, rect) {
    return (mouse.offsetX > rect.x && mouse.offsetY > rect.y && mouse.offsetX < rect.x + rect.width && mouse.offsetY < rect.y + rect.height);
}

function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;
  
    // which edge is closest?
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
  
    // get distance from closest edges
    let distX = cx-testX;
    let distY = cy-testY;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      return true;
    }
    return false;
}

function text(text, x, y, color="white", size="15px", font="Georgia"){
    ctx.fillStyle = color;
    ctx.font = `${size} ${font}`;
    ctx.fillText(text, x, y);
}

function circle(x, y, radius, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function rect(x, y, width, height, color="black") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawImage(image, x, y, width, height) {
    ctx.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);
}
