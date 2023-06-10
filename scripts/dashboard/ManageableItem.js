class ManeagleItem {
    static #items = [];
    static #currentId = 0;
    #id;

    constructor() {
        ManeagleItem.#items.push(this);
        this.#id = ManeagleItem.#currentId;
        ManeagleItem.#currentId++;
    }

    remove() {
        ManeagleItem.#items = ManeagleItem.#items.filter(item => item !== this);
    }

    getId() {
        return this.#id;
    }

    static getById(id) {
        return ManeagleItem.#items.find(item => item.getId() === id);
    }
}

export default ManeagleItem;