import ManeagleItem from "./ManageableItem.js";

class Link extends ManeagleItem {
    constructor(name, url, colorBackground) {
        super();
        this.name = name;
        this.url = url;
        this.colorBackground = colorBackground;
    }
}

export default Link;