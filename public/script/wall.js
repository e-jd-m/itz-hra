//vsechny steny hraciho pole jsou ulozeny v poli objektu wall

class Wall {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

    }
    //vykresleni steny
    show() {
        stroke(255);
        //ellipse(this.a.x, this.a.y, 3);
        //line(this.a.x - 1, this.a.y + 3, this.b.x, this.b.y + 3);
        line(this.a.x - 1, this.a.y + 1, this.b.x - 2, this.b.y + 2);
        //line(this.a.x + 3, this.a.y - 3, this.b.x, this.b.y);
        line(this.a.x, this.a.y, this.b.x, this.b.y);




    }
}