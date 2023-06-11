import ManageableItem from "./ManageableItem.js";

class Link extends ManageableItem {
    constructor(name, url, backgroundColor) {
        super();
        this.name = name;
        this.url = url;
        this.backgroundColor = backgroundColor;
    }
}

export default Link;