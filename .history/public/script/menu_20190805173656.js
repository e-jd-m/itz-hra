class Menu{
    constructor() {
        this.menuImg = menu;
        this.showMenu = false;

        this.saveChangesButton = createButton('save changes');


        createMenu();
    }

    createMenu() {
        saveChangesButton = createButton('save changes');
        saveChangesButton.position(368, 300);
        saveChangesButton.hide();
    }

    hideMenu() {
        
    }

    drawMenu() {
        if(this.showMenu)
        push();
        noFill();
        strokeWeight(5);
        rect(width / 2 - 100, height / 4, 200, 300);
        image(menuImg, 330, 200, menuImg.width * 2, menuImg.height * 2 - 5);
        saveChangesButton.show();
        pop();
    }
}