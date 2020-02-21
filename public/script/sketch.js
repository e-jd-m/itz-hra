let maze;
let fr = 0;
let walls = [];
const speed = 2
let allowMovement = true;
let cell_r;
let cells = [];
let socket;
let enemies = {};
let bullet, wall, menuImg;
let menu;
let devMode = true;
let currentShots = [];

const defGameServer = 'http://localhost:3000';

p5.disableFriendlyErrors = true;

function preload() {
    //natcteni obrazku
    maze = loadJSON('/maze');
    bullet = loadImage('img/bullet.png');
    wall = loadImage('img/wall.png');
    menuImg = loadImage('img/Menu.png');
}

function setup() {

    const canvas = createCanvas(800, 800);
    canvas.parent('#game');

    //pripojeni na socket
    let address = prompt("zadej adresu: ", defGameServer);
    socket = io.connect(address);

    //vypnuti kurzoru, pouzijeme vlastni 
    noCursor();

    menu = new Menu();

    cell_r = maze.cells[0].a;
    player = new Player((random(maze.cells).x + cell_r / 2), (random(maze.cells).y + cell_r / 2), {
        r: random(50, 255),
        g: random(50, 255),
        b: random(50, 255)
    }, Math.floor(Math.random() * 3));

    /*player = new Player((maze.cells[5].x + cell_r / 2), (maze.cells[5].y + cell_r / 2), {
        r: random(50, 255),
        g: random(50, 255),
        b: random(50, 255)
    });*/

    //console.log(player);


    //natcteni sten bunek bludiste do pole objektu
    //vytvoreni bunek
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

        cells.push(new Cell(c.i, c.j, c.a, c.walls));

    }

    //--------------------------------------------------------------------
    //pridani sten na okraji hraci plochy
    walls.push(new Wall(0, 0, width, 0));
    walls.push(new Wall(0, 0, 0, height));
    walls.push(new Wall(0, height, width, height));
    walls.push(new Wall(width, 0, width, height));
    //----------------------------------------------------------------------






    //----------------------------------------------------------------------------------
    //komunikace se socketem

    //poslani hrace po pripojeni
    socket.emit('newPl', {
        x: player.pos.x,
        y: player.pos.y,
        col: player.col,
        s: player.skin
    });

    //pripojeni noveho hrace
    socket.on('newPl', data => {
        enemies[data.id] = {
            player: new Player(data.x, data.y, data.col, data.skin)
        }


    });

    //ziskani vsech soucasnych hracu
    //volano puze jednou po pripojeni
    socket.on('players', data => {

        for (let [key, value] of Object.entries(data)) {
            enemies[key] = {
                player: new Player(value.x, value.y, value.col, value.skin)
            }
        }
        //console.table(enemies);
    })

    //hrac se odpojil
    //smazani nepritele
    socket.on('playerDis', id => {
        delete enemies[id];

    });

    //ziskani pozice nepritele
    socket.on('pos', data => {
        //console.log(data.index);
        const enemy = enemies[data.id];
        if (enemy)
            enemy.player.set_pos(data.x, data.y);

    })

    //strileni nepratel
    socket.on('shooting', data => {
        const enemy = enemies[data.id];
        if (!enemy) {
            console.error('missing  enemy');
            return;
        }
        //console.log(data.x, data.y);  

        //vsechny vystreli jsou pridany do pole
        //je uchovan cas kdy vystrel prisel
        currentShots.push({
            player: enemy.player,
            sX: data.x,
            sY: data.y,
            tX: data.tX,
            tY: data.tY,
            startTime: new Date()
        })
        //enemy.player.shoot(data.tX, data.tY, true);

    });
    socket.on('hit', ids => {
        for (let id of ids) {
            const hitPlayer = enemies[id];
            if (!hitPlayer) {
                console.log('got hit');
                player.gotHit(20);
                break;
            }
        }

    })

    socket.on('test', data => {
        console.log('succ :)', data);
    });

    //----------------------------------------------------------------------------------


    preventScrolling();

    /*
    setInterval(function () {
        addAmmo(player);
    }, 250);*/

    setInterval(() => player.addAmmo(1), 1000);


}
let frm = [];
let prof = [];

function draw() {
    background(0);
    //frameRate(5);
    //frm.push(frameRate());


    player.show(mouseX, mouseY, walls);
    player.showHealth(15, 780);

    player.aim.set_dir(mouseX, mouseY);
    //check walls skryva nebo zobrazuje viditelne steny
    player.checkWalls(walls);

    player.showAmmo(15, 760, bullet);

    //vykresleni vsech vystrelu (od nepratel)
    for (let i = 0; i < currentShots.length; i++) {
        let shot = currentShots[i];

        //pokud se vystrel stal dele nez pred 25 millis, tak je smazan
        if (Date.now() - shot.startTime >= 25) {
            currentShots.splice(i, 1);
        }
        shot.player.drawShot(shot.tX, shot.tY, shot.sX, shot.sY);
        //console.log("recieved pt", shot.tX, shot.tY);
    }
    menu.show(devMode);
    drawFramerate();


    if (menu.devMode) {
        walls.forEach(wall => {
            wall.show()
        });


        player.ammo = player.maxAmmo;
        player.health = player.maxHealth;

    }

    //zobrazeni vsech nepratel
    for (let [key, value] of Object.entries(enemies)) {
        //enemies[key].player.show();
        value.player.show();
    }

    checkMovement(allowMovement);

    menu.saveChanges();

    sendPos(player.pos);
    drawCursor(mouseX, mouseY, 15);
}

function mouseClicked() {

    //strileni hrace
    if (!menu.showMenu && player.isAlive) {
        if (player.ammo > 0) {
            let hit = player.shoot(mouseX, mouseY);
            pt = hit.endPt;
            currentShots.push({
                player,
                sX: player.pos.x,
                sY: player.pos.y,
                tX: pt.x,
                tY: pt.y,
                ptSet: true,
                startTime: new Date()
            })
            if (hit.ids.length) {
                socket.emit('hit', { ids: hit.ids });
            }
            socket.emit('shooting', { x: this.player.pos.x, y: this.player.pos.y, tX: pt.x, tY: pt.y });
            //console.log("user point", pt);

        }


    }


}