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

        //this.dir.normalize();
    }
    

    checkInter(x, y, walls) {

        //Math.sqrt((this.pos.x - pt.x) * (this.pos.x - pt.x) - (this.pos.y - pt.y) * (this.pos.y - pt.y));
        let pt = createVector(x,y);
        for (const wall of walls) {
            const x1 = wall.a.x;
            const y1 = wall.a.y;
            const x2 = wall.b.x;
            const y2 = wall.b.y;



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

            let minDist = Infinity;
            let dist;
            
            if (t > 0 && t < 1 && u > 0 && u < 1) { 

                pt.x = x1 + t * (x2 - x1);
                pt.y = y1 + t * (y2 - y1);

                consoo

                circle(pt.x, pt.y, 5);

                break;
            }
        }
        return pt;


    }
}