class Menu{
    constructor() {
        this.menuImg = menu;

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
        push();
        noFill();
        strokeWeight(5);
        rect(width / 2 - 100, height / 4, 200, 300);
        image(menu, 330, 200, menu.width * 2, menu.height * 2 - 5);
        saveChangesButton.show();
        pop();
    }
}