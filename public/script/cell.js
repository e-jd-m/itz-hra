//objekt, jednotliva bunka hraciho pole
//obsahuje souradnice, pozici na hraci plose, seznam sten

class Cell {
    constructor(i, j, a, wallsExist = []) {
        this.a = a;
        this.i = i;
        this.j = j;
        this.x = i * a;
        this.y = j * a;
        this.walls = wallsExist;
    }
}