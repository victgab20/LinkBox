import Button from "../Button.js";
import { getItemFromCard, getSelectedCards, removeItemFromUI } from "../util.js";

class ButtonDelete extends Button {
    constructor() {
        super("delete");
    }

    onClick() {
        const cards = getSelectedCards()
        const allItems = cards.map(getItemFromCard);

        if (allItems.length > 1) {
            allItems.forEach(item => {
                // item = this.getAssociatedItem();
                removeItemFromUI(item);
                item.remove()
            });
        } else {
            const item = this.getAssociatedItem();
            removeItemFromUI(item);
            item.remove();
        }
    }
}

export default ButtonDelete;