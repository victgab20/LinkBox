import Button from "../Button.js";
import Link from "../Link.js";
import { updateCard } from "../util.js";

class ButtonEdit extends Button {
    constructor() {
        super("edit");
    }

    onClick() {
        const item = this.getAssociatedItem();
        let name = prompt("Nome:", item.name);
        let url

        if (name === null) return;

        if (item instanceof Link) {
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

        if (shouldUpdateCard) updateCard(this.getContainerCard());
    }
}

export default ButtonEdit;