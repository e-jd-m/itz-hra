class Ray {
    constructor(pos) {
        this.pos = pos;
        this.dir = createVector(0, 1);
    }
    show() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }
    set_dir(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;

        this.dir.normalize();
    }
    cast(boundary) {
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    }

    checkInter(x, y) {

        for (let i = 0; i < walls.length; i++) {
        const x1 = this.pos.x;
        const y1 = this.pos.y;

        const x2 = x;
        const y2 = y;
        let x3, y3, x4, y4;
        let t, u;

        for (let j = 0; j < walls.length; j++) {

            const wall = walls[j];
            x3 = wall.a.x;
            y3 = wall.a.y;

            x4 = wall.b.x;
            y4 = wall.b.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

            t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t > 0 && t < 1 && u > 0 && u < 1) {
                ok = false;
            }

        }

      
    }
}


