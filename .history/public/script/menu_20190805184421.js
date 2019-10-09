class Menu {
    constructor() {
        this.menuImg = menuImg;
        this.showMenu = false;
        this.h = 300;
        this.w = 200;
        this.x = width / 2 - 100;
        this.y = height / 4;

        this.saveChangesButton = createButton('save changes');
        this.showFps = createCheckbox('Fps', false);


        this.create();
    }

    create() {

        this.saveChangesButton.position(this.x + 65, this.y + this.h - this.saveChangesButton.height);
        this.saveChangesButton.hide();

        this.showFps.position(this.x + 50, this.y + 100);
        this.showFps.hide()
    }

    hide() {
        this.saveChangesButton.hide();
        this.showFps.hide();
    }

    show() {
        if (this.showMenu) {
            push();
            noFill();
            strokeWeight(5);
            rect(this.x, this.y, this.w, this.h);
            image(menuImg, 330, 200, menuImg.width * 2, menuImg.height * 2 - 5);
            this.saveChangesButton.show();
            pop();

            push();
            stroke(255);
            
            text('Show Fps', this.x + 60, this.y + 100);
            pop();


        }
    }

    saveChanges() {
        this.saveChangesButton.mousePressed(() => {
            console.log(`my name jeff`);
        })
    }
}