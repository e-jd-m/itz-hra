class Wall {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

    }
    show() {
        stroke(255);
        //ellipse(this.a.x, this.a.y, 3);
        /*line(this.a.x, this.a.y + 3, this.b.x, this.b.y + 3);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        line(this.a.x + 3, this.a.y + 3, this.b.x, this.b.y);*/

        if (this.a.y == this.b.y) {
            let w = Math.sqrt((this.a.x - this.b.x) * (this.a.x - this.b.x) + (this.a.y - this.b.y) * (this.a.y - this.b.y));
            image(wall, this.a.x, this.a.y, w + 10, 5);
        } else {
            let h = Math.sqrt((this.a.x - this.b.x) * (this.a.x - this.b.x) + (this.a.y - this.b.y) * (this.a.y - this.b.y));
            image(wall, this.a.x, this.a.y, 5, h);
        }


    }
}