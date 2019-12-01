class Ray {
    constructor(pos) {
        this.pos = pos;
        this.dir = createVector(0, 1);
        this.r = 5;
    }

    set_dir(theta) {

        this.dir.set(this.pos.x + this.r * cos(theta), this.pos.y + this.r * sin(theta));

        //this.dir.normalize();
    }
    set_pos(x, y) {
    }


    checkInter(walls) {

        //Math.sqrt((this.pos.x - pt.x) * (this.pos.x - pt.x) + (this.pos.y - pt.y) * (this.pos.y - pt.y));
        let pts = [];
        for (const wall of walls) {
            const x1 = wall.a.x;
            const y1 = wall.a.y;
            const x2 = wall.b.x;
            const y2 = wall.b.y;


            const x3 = this.pos.x;
            const y3 = this.pos.y;
            const x4 = this.dir.x;
            const y4 = this.dir.y;
            //const x4 = this.pos.x + this.dir.x;
            //const y4 = this.pos.y + this.dir.y;



            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den == 0) {
                //return pt;
            }

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            //&& u >= 0 && u <= 1     && u <= 1
            if (t >= 0 && t <= 1 && u >= 0) {
                pts.push(createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1)));
            }
        }

        let d = Infinity;
        let closest;
        for (const p of pts) {
            let t = getDistance(this.pos.x, this.pos.y, p.x, p.y);
            //console.log(t);
            //Math.sqrt((this.pos.x - p.x) * (this.pos.x - p.x) + (this.pos.y - p.y) * (this.pos.y - p.y));
            if (t < d) {
                d = t;
                closest = p;
            }
        }
        //console.log(closest);
        if (pts.length > 0) {

            return closest;

        }



    }
}