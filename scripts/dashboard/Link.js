import ManageableItem from "./ManageableItem.js";

class Link extends ManageableItem {
    constructor(name, url, backgroundColor) {
        super();
        this.name = name;
        this.url = url;
        this.backgroundColor = backgroundColor;
    }

    clone() {
        const clonedLink = new Link(this.name, this.url, this.backgroundColor);
        clonedLink.setParent(this.getParent());
        return clonedLink;
    }
}

export default Link;