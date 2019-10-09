const express = require(`express`);
const app = express();
app.listen(5000);

app.use(express.static(`../public`));

app.get(`/maze`, (req, res) => {
    class Cell {
        constructor(i, j, a) {
            this.a = a;
            this.i = i;
            this.j = j;
            this.x = this.i * a;
            this.y = this.j * a;
            this.walls = [true, true, true, true];
            this.boundaries = [];
            this.visited = false;

        }


        check_surrounding(cells = []) {
            let surrounding = [];

            let top = cells[index(this.i, this.j - 1)]
            let right = cells[index(this.i + 1, this.j)]
            let bott = cells[index(this.i, this.j + 1)]
            let left = cells[index(this.i - 1, this.j)]


            if (top && !top.visited) {
                surrounding.push(top);
            }
            if (right && !right.visited) {
                surrounding.push(right);
            }
            if (bott && !bott.visited) {
                surrounding.push(bott);
            }
            if (left && !left.visited) {
                surrounding.push(left);
            }

            if (surrounding.length > 0) {
                let r = Math.floor(random(0, surrounding.length));
                return surrounding[r];

            } else
                return undefined;

        }

        remove_walls(other) {
            let x = this.i - other.i;
            if (x === 1) {
                this.walls[3] = false;
                other.walls[1] = false;
            } else if (x === -1) {
                this.walls[1] = false;
                other.walls[3] = false;
            }
            let y = this.j - other.j;
            if (y === 1) {
                this.walls[0] = false;
                other.walls[2] = false;
            } else if (y === -1) {
                this.walls[2] = false;
                other.walls[0] = false;
            }
        }

    }

    function index(i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
            return -1;

        return i + j * cols;
    }
    rows = Math.floor(height / cell_r);
    cols = Math.floor(width / cell_r);

    for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < cols; j += 1) {

            cells.push(new Cell(j, i, cell_r));
        }
    }

    current = cells[0];

    do {
        current.visited = true;
        let next = current.check_surrounding(cells);
        if (next) {
            next.visited = true;

            stack.push(current);

            current.remove_walls(next);

            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    } while (stack.length);

    res.send({
        resp:cells
    })
});