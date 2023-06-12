import Button from "../Button.js";
import { removeItemFromUI } from "../util.js";

class ButtonDelete extends Button {
    constructor() {
        super("delete");
    }

    onClick() {
        removeItemFromUI(this.getAssociatedItem());
    }
}

export default ButtonDelete;