import Button from "../Button.js";
import * as util from "../util.js";

class ButtonEdit extends Button {
    constructor() {
        super("edit");
    }

    onClick() {
        const item = this.getAssociatedItem();
        const itemType = util.getItemType(item);
        let shouldUpdateCard;

        if (itemType === "link") {
            const { url, title } = util.inputLinkInfo(item.url, item.title);
            if (url) item.url = url;
            if (title) item.title = title;
            shouldUpdateCard = !!url || !!title;
        } else {
            const { name } = util.inputFolderInfo(item.name);
            if (name) item.name = name;
            shouldUpdateCard = !!name;
        }

        if (shouldUpdateCard) util.updateCard(this.getCardFromCardsList());
    }
}

export default ButtonEdit;