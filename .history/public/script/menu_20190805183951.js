class Menu {
    constructor() {
        this.menuImg = menuImg;
        this.showMenu = false;
        this.h = 300;
        this.w = 200;
        this.x = width / 2 - 100;
        this.y = height / 4;

        this.saveChangesButton = createButton('save changes');
        this.showFps = createCheckbox('Fps');


        this.create();
    }

    create() {

        this.saveChangesButton.position(this.x + 65, this.y + this.h - this.saveChangesButton.height);
        this.saveChangesButton.hide();

        
    }

    hide() {
        this.saveChangesButton.hide();
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
        }
    }

    saveChanges() {
        this.saveChangesButton.mousePressed(() => {
            console.log(`my name jeff`);
        })
    }
}