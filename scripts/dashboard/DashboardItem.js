class DashboardItem {
    static #items = [];
    static #currentId = 0;
    #parent;
    #id;

    constructor() {
        DashboardItem.#items.push(this);
        this.#id = DashboardItem.#currentId;
        DashboardItem.#currentId++;
    }

    setParent(parent) {
        this.#parent = parent;
    }

    getParent() {
        return this.#parent;
    }

    getId() {
        return this.#id;
    }

    static getById(id) {
        return DashboardItem.#items.find(item => item.getId() === id);
    }
}

export default DashboardItem;