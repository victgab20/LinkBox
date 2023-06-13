import ManageableItem from "./ManageableItem.js";

class Folder extends ManageableItem {
    #children = [];

    constructor(name, backgroundColor, children) {
        super();

        this.name = name;
        this.backgroundColor = backgroundColor

        if (Array.isArray(children)) {
            this.#setChildren(children);
        }
    }

    clone() {
        const clonedFolder = new Folder(this.name, this.backgroundColor, this.getChildren());
        clonedFolder.setParent(this.getParent());
        return clonedFolder;
    }

    isRoot() {
        return !this.getParent();
    }

    #setChildren(children) {
        this.#children = children
    }

    getChildren() {
        return this.#children;
    }

    remove() {
    }

    removeChild(child) {
        this.#setChildren(this.getChildren().filter(v => v !== child))
    }

    addChild(child) {
        this.getChildren().push(child);
    }

    contains(item) {
        for (const child of this.getChildren()) {
            if (child === item) return true;
        }

        return false;
    }
}

export default Folder;