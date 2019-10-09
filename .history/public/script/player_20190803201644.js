class Player {
    constructor(x, y, col) {
        this.pos = createVector(x, y);
        this.r = 15;
        this.aim = new Ray(this.pos);
        this.isShooting = false;
        this.col = col;
        this.health = 100;

    }

    show(sX, sY, walls) {
        push();
        fill(this.col.r, this.col.g, this.col.b);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r);
        stroke(255);
        if (this.isShooting) {
            let point = this.aim.checkInter(sX, sY, walls);
            line(this.pos.x, this.pos.y, point.x, point.y);
        }
        pop();
    }

    look(walls) {

        for (let i = 0; i < walls.length; i++) {
            const point = {
                x: (walls[i].a.x + walls[i].b.x) / 2,
                y: (walls[i].a.y + walls[i].b.y) / 2
            }

            const x1 = this.pos.x;
            const y1 = this.pos.y;

            const x2 = point.x;
            const y2 = point.y;
            let x3, y3, x4, y4;
            let t, u;
            let ok = true;

            for (let j = 0; j < walls.length; j++) {

                const wall = walls[j];
                x3 = wall.a.x;
                y3 = wall.a.y;

                x4 = wall.b.x;
                y4 = wall.b.y;

                const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
                if (den === 0) {
                    ok = false;
                } else {


                    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                    u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

                    if (t > 0 && t < 1 && u > 0 && u < 1) {
                        ok = false;
                        break;
                    }
                }


            }



            if (ok) {
                stroke(0, 255, 0);
                line(this.pos.x, this.pos.y, point.x, point.y);
                walls[i].show();
            }
        }


    }

    showHealth() {
        push();
        fill(255);
        stroke(255)
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