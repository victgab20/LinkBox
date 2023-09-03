import DashboardItem from "./DashboardItem.js";

class DashboardFolder extends DashboardItem {
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
        const clonedFolder = new DashboardFolder(this.name, this.backgroundColor, this.getChildren());
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

    moveChildToAnotherFolder(child, folder) {
        if (!this.contains(child)) return;

        folder.addChild(child);
        this.removeChild(child);
    }

    addChild(child) {
        this.getChildren().push(child);
    }

    getChildIndex(child) {
        const targetChild = child;
        return this.#children.findIndex(child => child === targetChild);
    }

    moveChild(child, index) {
        let children = this.getChildren();
        const childIndex = this.getChildIndex(child);
        if (childIndex === index) return;
        children[childIndex] = null;

        let leftChildren = children.slice(0, index);
        let rightChildren = children.slice(index);

        children = [...leftChildren, child, ...rightChildren];
        children = children.filter(child => child !== null);

        this.#setChildren(children);
    }

    contains(item) {
        for (const child of this.getChildren()) {
            if (child === item) return true;
        }

        return false;
    }
}

export default DashboardFolder;