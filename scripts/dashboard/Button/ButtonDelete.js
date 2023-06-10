import Button from "../Button.js";
import Folder from "../Folder.js";
import Link from "../Link.js";
import { getCardType } from "../util.js";

class ButtonDelete extends Button {
    constructor() {
        super("delete");
    }

    onClick() {
        const card = this.getContainerCard();
        const container = card.parentElement;
        const filteredContainerChildren = [...container.children].filter(child => child !== card);
        container.replaceChildren(...filteredContainerChildren);
        const cardType = getCardType(card);
        const id = parseInt(card.getAttribute(`data-${cardType}-id`));

        if (cardType == "link") {
            Link.getById(id).remove();
        } else if (cardType == "folder") {
            Folder.getById(id).remove();
        }
    }
}

export default ButtonDelete;