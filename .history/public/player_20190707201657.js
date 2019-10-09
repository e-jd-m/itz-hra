class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.rays = [];
        this.r=

        for (let a = 0; a < 360; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 10);
        for (let i = 0; i < this.rays.length; i++) {
            //this.rays[i].show();
        }
    }

    look(walls) {
        noFill();
        stroke(255);
        beginShape();
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                //line(this.pos.x, this.pos.y, closest.x, closest.y);
                if (true) {
                    //TODO clipping
                    vertex(closest.x, closest.y);
                }
            }
            endShape();
        }

    }

    set_pos(x, y) {
        this.pos.set(x, y);
    }

    move_x(speed) {
        this.pos.x += speed;
    }
    move_y(speed) {
        this.pos.y += speed;
    }
}