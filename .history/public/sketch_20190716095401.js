 class Wall {
     constructor(x1, y1, x2, y2) {
         this.a = createVector(x1, y1);
         this.b = createVector(x2, y2);
     }
     show() {
         //stroke(255);
         line(this.a.x, this.a.y, this.b.x, this.b.y);
     }
 }


 let maze;
 let fr = 0;
 let walls = [];
 let speed;

 function preload() {
     maze = loadJSON('/maze');
 }

 function setup() {
     createCanvas(800, 800);


     player = new Player(maze.cells[0].i + maze.cells[0].a / 2, maze.cells[0].j + maze.cells[0].a / 2);
     for (let c of maze.cells) {
         if (c.walls[0]) {
             walls.push(new Wall(c.x, c.y, c.x + c.a, c.y))
         }
         if (c.walls[1]) {
             walls.push(new Wall(c.x + c.a, c.y, c.x + c.a, c.y + c.a));
         }
         if (c.walls[2]) {
             walls.push(new Wall(c.x + c.a, c.y + c.a, c.x, c.y + c.a));
         }
         if (c.walls[3]) {
             walls.push(new Wall(c.x, c.y + c.a, c.x, c.y));
         }

     }

     speed = 5;

 }



 function draw() {
     background(0);

     player.show();

     
     let jeff = 10;
     jeff
     /*
     for (let wall of walls) {
         wall.show();
     }*/
     player.look(walls);

     player.set_pos(mouseX, mouseY);


     /*
          if (keyIsDown(LEFT_ARROW)) {
              if (!checkCol(speed, player.pos)) {
                  player.move_x(-speed, player.pos, true);
              }

          }
          !checkCol(speed, player.pos 
          
         */
     /*
          if (keyIsDown(RIGHT_ARROW)) {
              if (true) {
                  player.move_x(speed, player.pos, true);
              }
          }*/
     /*
     if (keyIsDown(UP_ARROW)) {
         if (checkCol(speed, player.pos)) {
             player.move_y(-speed, player.pos, false);
         }
     }

     if (keyIsDown(DOWN_ARROW)) {
         if (checkCol(speed, player.pos)) {
             player.move_y(speed, player.pos, false);
         }
     }*/


     if (frameCount % 5 == 0) {
         fr = frameRate().toFixed(2);
     }
     textSize(20);
     text(fr, 10, 20);

 }
/*
 function checkCol(speed, pos, isX) {
     /*
          if (pos.x + speed + player.r > width) {
              player.move_x(-0.5);
              return false;
          }
          if (pos.x + speed <= player.r + 5) {
              player.move_x(0.5);
              return false;
          }
          if (pos.y + speed + player.r > height) {
              player.move_y(-0.5);
              return false;
          }
          if (pos.y + speed <= player.r + 5) {
              player.move_y(0.5);
              return false;
          }
     let i = Math.floor(pos.x / cells[0].a);
     let j = Math.floor(pos.y / cells[0].a);


     let cell = cells[index(i, j, Math.floor(height / cells[0].a), Math.floor(width / cells[0].a))];
     let walls = cell.walls;

     console.log(cell.i, cell.j);

     if (isX) {
         if (speed > 0) {
             if (walls[1]) {
                 return pos.x + speed + player.r >= cell.x + cell.a;
             }
         }
     }





 }

 function index(i, j, cols, rows) {
     if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
         return -1;

     return i + j * cols;
 }*/