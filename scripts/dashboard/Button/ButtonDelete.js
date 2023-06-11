import Button from "../Button.js";
import Folder from "../Folder.js";
import Link from "../Link.js";
import { dispatchCardEvent, getCardType } from "../util.js";

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
        let item = cardType == "link" ? Link.getById(id) : Folder.getById(id)

        item.remove();

        dispatchCardEvent(new CustomEvent("custom:cardRemoved", {
            detail: { type: cardType, item, card, allCards: container.querySelector(".link-card, .folder-card") ?? [] }
        }))
    }
}

export default ButtonDelete;