class ManageableItem {
    static #items = [];
    static #currentId = 0;
    #id;

    constructor() {
        ManageableItem.#items.push(this);
        this.#id = ManageableItem.#currentId;
        ManageableItem.#currentId++;
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