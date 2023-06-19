import ManageableItem from "./ManageableItem.js";

class Link extends ManageableItem {
    constructor(title, url, backgroundColor) {
        super();
        this.title = title;
        this.url = url;
        this.backgroundColor = backgroundColor;
    }

    clone() {
        const clonedLink = new Link(this.title, this.url, this.backgroundColor);
        clonedLink.setParent(this.getParent());
        return clonedLink;
    }

    remove() {
        this.getParent().removeChild(this);
    }
}

export default Link;