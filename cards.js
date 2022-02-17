class Card {
    constructor (name, x, y, price) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = "gray";
        this.price = price;
        this.width = 80;
        this.height = 100;
        this.image = new Image();
        this.image.src = "Images/" + name + ".png";
    }

    draw() {
        rect(this.x, this.y, this.width, this.height, this.color);
        drawImage(this.image, this.x+20, this.y+30, 40, 40);
        text(this.price, this.x+this.width/2-10, this.y+this.height-5);
    }
}