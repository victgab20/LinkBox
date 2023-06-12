class ManageableItem {
    static #items = [];
    static #currentId = 0;
    #parent;
    #id;

    constructor() {
        ManageableItem.#items.push(this);
        this.#id = ManageableItem.#currentId;
        ManageableItem.#currentId++;
    }

    setParent(parent) {
        this.#parent = parent;
    }

    getParent() {
        return this.#parent;
    }

    remove() {
        ManageableItem.#items = ManageableItem.#items.filter(item => item !== this);
    }

    getId() {
        return this.#id;
    }

    static getById(id) {
        return ManageableItem.#items.find(item => item.getId() === id);
    }
}

export default ManageableItem;