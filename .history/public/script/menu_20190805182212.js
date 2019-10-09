class Menu {
    constructor() {
        this.menuImg = menuImg;
        this.showMenu = false;
        this.h = 300;
        this.w = 200;

        this.saveChangesButton = createButton('save changes');


        this.create();
    }

    create() {

        this.saveChangesButton.position(, 300);
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
            rect(width / 2 - 100, height / 4, this.w, this.h);
            image(menuImg, 330, 200, menuImg.width * 2, menuImg.height * 2 - 5);
            this.saveChangesButton.show();
            pop();
        }
    }
}