//objekt, obsahuje herni menu

class Menu {
    constructor() {
        this.menuImg = menuImg;
        this.showMenu = false;
        this.h = 300;
        this.w = 200;
        this.x = width / 2 - 100;
        this.y = height / 4;
        this.showFps = true;
        this.rays = false;

        this.bttns = [];
        this.devMode = false;

        this.showFpsCheck = createCheckbox('Fps', this.showFps);
        this.showRaysCheck = createCheckbox('Show Rays', this.rays);

        this.devModeCheck = createCheckbox('devMode', this.devMode);

        let n = screen.width / 2 - width;
        this.showFpsCheck.position(this.x + 50, this.y + 100);
        this.showFpsCheck.hide();


        this.devModeCheck.position(this.x + 50, this.y + 160);
        this.devModeCheck.hide();
        this.devModeCheck.parent(document.querySelector('#menu'));

        this.showRaysCheck.position(this.x + 50, this.y + 130);
        this.showRaysCheck.hide();

        this.bttns.push(this.showFpsCheck);
        this.bttns.push(this.showRaysCheck);
        //this.bttns.push(this.devModeCheck);

        for (let el of this.bttns) {
            el.parent(document.querySelector('#menu'));
        }

    }

    //funkce, ktera schova vsechny cudliky v menu
    hide() {
        this.bttns.forEach(bttns => bttns.hide());
        this.devModeCheck.hide();
        toggleMovement(true);
    }
    //zobrazeni menu
    show(devMode) {
        if (this.showMenu) {

            push();
            fill(0);
            strokeWeight(5);
            rect(this.x, this.y, this.w, this.h);
            image(menuImg, width / 2 - menuImg.width, height / 4, menuImg.width * 2, menuImg.height * 2 - 5);

            pop();

            push();
            stroke(255);
            fill(255);
            this.bttns.forEach(bttns => bttns.show());
            if (devMode)
                this.devModeCheck.show();
            pop();

            toggleMovement(false);

            //$('*').css(`cursor`, `none`);



        } else {
            for (let el of document.querySelectorAll("*")) {
                el.style.cursor = "auto";
            }
            //$('*').css(`cursor`, `auto`);
            noCursor();
        }
        /*<script
        src = "https://code.jquery.com/jquery-3.4.1.min.js"
        integrity = "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin = "anonymous"
            ></script >*/
    }
    //ulozeni zmen 
    saveChanges() {

        this.showFpsCheck.changed(() => {
            this.showFps = !this.showFps;

        });


        this.devModeCheck.changed(() => {
            this.devMode = !this.devMode;
        });
        this.showRaysCheck.changed(() => {
            this.rays = !this.rays;
        });



    }
}