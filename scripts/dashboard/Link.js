class Link {
    static #links = [];
    static #currentId = 0;
    #id;

    constructor(name, url, colorBackground) {
        this.name = name;
        this.url = url;
        this.colorBackground = colorBackground;
        this.#id = Link.#currentId;
        Link.#links.push(this);
        Link.#currentId++;
    }

    remove() {
        Link.#links = Link.#links.filter(link => link !== this);
    }

    getId() {
        return this.#id;
    }

    static getById(id) {
        return Link.#links.find(link => link.getId() === id);
    }
}

export default Link;