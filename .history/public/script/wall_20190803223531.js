class Wall {
    constructor(x1, y1, x2, y2, exists) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

    }
    show() {
        stroke(255);
        //ellipse(this.a.x, this.a.y, 3);
        //line(this.a.x, this.a.y, this.b.x, this.b.y);

        image(wall, this.a.x, this.a.y, 20, 20, this.b.x, this.b.y);
    }
}