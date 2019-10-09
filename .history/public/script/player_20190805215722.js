class Player {
    constructor(x, y, col) {
        this.pos = createVector(x, y);
        this.r = 15;
        this.aim = new Ray(this.pos);
        this.isShooting = false;
        this.col = col;
        this.health = 100;
        this.ammo = 20;
        this.skins = ['points', 'lines', 'lines2', 'circle'];
        this.skin = this.skins[2];


    }

    show(sX, sY, walls) {
        push();
        //fill(this.col.r, this.col.g, this.col.b);
        //noStroke();
        //ellipse(this.pos.x, this.pos.y, this.r * 2);


        if (this.skin === `points`) {
            stroke(this.col.r, this.col.g, this.col.b);
            let x1, y1;
            for (let i = 0; i < 360; i += 1) {
                x1 = this.r * Math.cos(i * PI / 180);
                y1 = this.r * Math.sin(i * PI / 180);

                point(random(this.pos.x, this.pos.x + x1), random(this.pos.y, this.pos.y + y1))
            }
            noFill();
            ellipse(this.pos.x, this.pos.y, this.r * 2);

        } else if (this.skin === 'lines') {

            stroke(this.col.r, this.col.g, this.col.b);
            let x1, y1;
            for (let i = 0; i < 360; i += 20) {
                x1 = this.r * Math.cos(i * PI / 180);
                y1 = this.r * Math.sin(i * PI / 180);

                line(this.pos.x, this.pos.y, this.pos.x + x1, this.pos.y + y1);

            }
            noFill();
            ellipse(this.pos.x, this.pos.y, this.r * 2);

        } else if (this.skin === 'circle') {

            fill(this.col.r, this.col.g, this.col.b);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.r * 2);
        } else if (this.skin === 'lines2') {


            let x1, y1;
            let pts = [];
            for (let i = 0; i < 360; i += 20) {
                x1 = this.r * Math.cos(i * PI / 180);
                y1 = this.r * Math.sin(i * PI / 180);
                pts.push(createVector(this.pos.x + x1, this.pos.y + y1));
            }
            for (let pt of pts) {
                stroke(this.col.r, this.col.g, this.col.b);
                vertex(random(pts).x,random(pts).y)
            }
            noFill();
            stroke(this.col.r, this.col.g, this.col.b);
            //ellipse(this.pos.x, this.pos.y, this.r * 2);
        }


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
                    ok = true;
                } else {


                    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                    u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

                    if (t > 0 && t < 1 && u > 0 && u < 1) {
                        ok = false;
                        //stroke(255, 0, 0);
                        //line(this.pos.x, this.pos.y, point.x, point.y);
                        break;
                    }
                }


            }



            if (ok) {
                stroke(0, 255, 0);
                //line(this.pos.x, this.pos.y, point.x, point.y);
                walls[i].show();
            }
        }


    }

    showHealth(x, y) {
        push();
        fill(255, 0, 0);
        noStroke();
        rectMode(CENTER);
        rect(x, y, 20, 7);
        rect(x, y, 7, 20);
        pop();

        push();
        fill(255);
        stroke(255);
        textSize(10);
        text(`${this.health}/100`, x + 15, y + 3);
        pop();
    }

    showAmmo(x, y, bullet) {
        /*push();
        fill(255, 165, 0);
        noStroke();
        rectMode(CENTER);
        rect(x, y, 15, 7);
        ellipse(x + 7, y, 7);
        pop();*/

        image(bullet, x - 12, y - 9, 25, 15);

        push();
        fill(255);
        stroke(255);
        textSize(10);
        text(`${this.ammo}/20`, x + 15, y + 3);
        pop();
    }




    set_pos(x, y) {
        this.pos.set(x, y);
    }

    move_x(speed, r, cells) {
        let i = Math.floor(this.pos.x / r);
        let j = Math.floor(this.pos.y / r);


        let cell = cells[index(i, j, Math.floor(height / r), Math.floor(width / r))];

        if (speed > 0) {
            if (cell.walls[1]) {
                if (!(this.pos.x + this.r >= cell.x + r))
                    this.pos.x += speed;
            } else {
                this.pos.x += speed;
            }
        } else if (speed < 0) {
            if (cell.walls[3]) {
                if (!(this.pos.x - this.r <= cell.x))
                    this.pos.x += speed;
            } else {
                this.pos.x += speed;
            }
        }

    }
    move_y(speed, r, cells) {
        let i = Math.floor(this.pos.x / r);
        let j = Math.floor(this.pos.y / r);


        let cell = cells[index(i, j, Math.floor(height / r), Math.floor(width / r))];

        if (speed > 0) {
            if (cell.walls[2]) {
                if (!(this.pos.y + this.r >= cell.y + r))
                    this.pos.y += speed;
            } else {
                this.pos.y += speed;
            }
        } else if (speed < 0) {
            if (cell.walls[0]) {
                if (!(this.pos.y - this.r <= cell.y))
                    this.pos.y += speed;
            } else {
                this.pos.y += speed;
            }
        }
    }
}