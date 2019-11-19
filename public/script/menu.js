class Menu {
    constructor() {
        this.menuImg = menuImg;
        this.showMenu = false;
        this.h = 300;
        this.w = 200;
        this.x = width / 2 - 100;
        this.y = height / 4;
        this.showFps = true;
        this.allowSound = true;
        this.bttns = [];

        this.showFpsCheck = createCheckbox('Fps', this.showFps);
        this.allowSoundCheck = createCheckbox('Sound', this.allowSound);

        let n = screen.width / 2 - width;
        this.showFpsCheck.position(this.x + 50, this.y + 100);
        this.showFpsCheck.hide();

        this.allowSoundCheck.position(this.x + 50, this.y + 130);
        this.allowSoundCheck.hide();

        this.bttns.push(this.showFpsCheck);
        this.bttns.push(this.allowSoundCheck);

        for (let el of this.bttns) {
            el.parent(document.querySelector('#menu'));
        }

    }


    hide() {
        this.bttns.forEach(bttns => bttns.hide());
        toggleMovement(true);
    }

    show() {
        if (this.showMenu) {

            push();
            fill(0);
            strokeWeight(5);
            rect(this.x, this.y, this.w, this.h);
            image(menuImg, 330, 200, menuImg.width * 2, menuImg.height * 2 - 5);

            pop();

            push();
            stroke(255);
            fill(255);
            this.bttns.forEach(bttns => bttns.show());
            pop();

            toggleMovement(false);

            //$('*').css(`cursor`, `none`);



        } else {
            $('*').css(`cursor`, `auto`);
            noCursor();
        }
    }

    saveChanges() {

        this.showFpsCheck.changed(() => {
            this.showFps = !this.showFps;

        });

        this.allowSoundCheck.changed(() => {
            this.allowSound = !this.allowSound;
        });

    }
}