import Button from "../Button.js";
import { getItemType, updateCard } from "../util.js";

class ButtonEdit extends Button {
    constructor() {
        super("edit");
    }

    onClick() {
        const item = this.getAssociatedItem();
        let name = prompt("Nome:", item.name);
        let url

        if (name === null) return;

        if (getItemType(item) === "link") {
            url = prompt("URL:", item.url);

            if (!url) return;
        }

        let shouldUpdateCard = false;

        if (name !== item.name) {
            item.name = name;
            shouldUpdateCard = true;
        }

        if (url !== item.url) {
            item.url = url;
            shouldUpdateCard = true;
        }

        if (shouldUpdateCard) updateCard(this.getCardFromCardsList());
    }
}

export default ButtonEdit;