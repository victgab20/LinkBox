import ManageableItem from "./ManageableItem.js";

class Link extends ManageableItem {
    constructor(name, url, colorBackground) {
        super();
        this.name = name;
        this.url = url;
        this.colorBackground = colorBackground;
    }
}

export default Link;