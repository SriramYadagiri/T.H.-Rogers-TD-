class Node {
    constructor(x, y, vel, end = false) {
        this.x = x;
        this.y = y;
        this.vel = vel;
        this.visited = null;
        this.end = end;
    }
    draw() {
        rect(this.x, this.y, 10, 10, "white");
    }
}