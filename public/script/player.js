

class Player {
    constructor(x, y, col, s) {
        this.pos = createVector(x, y);
        this.r = 23;
        this.aim = new Ray(this.pos);
        this.col = col;

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.maxAmmo = 10;
        this.ammo = this.maxAmmo;
        this.skin = s;
        this.isAlive = true;


    }

    show() {
        push();
        //fill(this.col.r, this.col.g, this.col.b);
        //noStroke();
        //ellipse(this.pos.x, this.pos.y, this.r * 2);


        if (this.skin === 0) {
            stroke(this.col.r, this.col.g, this.col.b);
            let x1, y1;
            for (let i = 0; i < 360; i += 1) {
                x1 = this.r * Math.cos(i * PI / 180);
                y1 = this.r * Math.sin(i * PI / 180);

                point(random(this.pos.x, this.pos.x + x1), random(this.pos.y, this.pos.y + y1))
            }
            noFill();
            ellipse(this.pos.x, this.pos.y, this.r * 2);

        } else if (this.skin === 1) {

            stroke(this.col.r, this.col.g, this.col.b);
            let x1, y1;
            for (let i = 0; i < 360; i += 20) {
                x1 = this.r * Math.cos(i * PI / 180);
                y1 = this.r * Math.sin(i * PI / 180);

                line(this.pos.x, this.pos.y, this.pos.x + x1, this.pos.y + y1);

            }
            noFill();
            ellipse(this.pos.x, this.pos.y, this.r * 2);

        } else if (this.skin === 2 || !this.skin) {

            fill(this.col.r, this.col.g, this.col.b);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.r * 2);
        }


        pop();
    }


    checkWalls(walls) {

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

    drawShot(tX, tY, sX, sY) {
        push();
        strokeWeight(5);
        let startPt = createVector(sX, sY)
        let endPt = createVector(tX, tY);

        //drawingContext.setLineDash([10, 20]);
        line(startPt.x, startPt.y, endPt.x, endPt.y);
        pop();
    }
    shoot(tX, tY) {
        let endPt = createVector(tX, tY);

        endPt = this.aim.checkInter(tX, tY, walls);
        this.ammo--;

        return { endPt, ids: this.checkHit(this.pos, endPt) };

    }

    checkHit(startPt, endPt) {
        let ids = [];
        for (let [key, value] of Object.entries(enemies)) {
            const enemy = value.player;
            let dx, dy, A, B, C, det, t1, t2;

            dx = endPt.x - startPt.x;
            dy = endPt.y - startPt.y;

            A = dx * dx + dy * dy;
            B = 2 * (dx * (startPt.x - enemy.pos.x) + dy * (startPt.y - enemy.pos.y));
            C = (startPt.x - enemy.pos.x) ** 2 +
                (startPt.y - enemy.pos.y) ** 2 -
                enemy.r ** 2;

            det = B * B - 4 * A * C;
            if (det == 0) {
                t1 = -B / (2 * A);
                if (t1 <= 1 && t1 >= 0) {
                    console.log('hit');
                    ids.push(key);
                }
            } else if (det > 0) {
                t1 = ((-B + Math.sqrt(det)) / (2 * A));
                t2 = ((-B - Math.sqrt(det)) / (2 * A));

                if ((t1 <= 1 && t1 >= 0) && (t2 <= 1 && t2 >= 0)) {
                    console.log('hit');
                    ids.push(key);
                }
            }


        }
        return ids;
    }

    addAmmo(amount = 1) {
        if (this.ammo < this.maxAmmo)
            this.ammo += amount;
    }
    gotHit(damage) {
        if (this.health - damage <= 0) {
            this.isAlive = false;
            toggleMovement(false);
            this.deathScreen();
        }
        if (this.health - damage >= 0)
            this.health -= damage;
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
        text(`${this.health}/${this.maxHealth}`, x + 15, y + 3);
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
        text(`${this.ammo}/${this.maxAmmo}`, x + 15, y + 3);
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
    deathScreen() {
        alert("prohral jsi!")
    }
}