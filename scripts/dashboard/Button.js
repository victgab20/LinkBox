import * as util from "./util.js";

class Button {
    #icon;
    #element;

    constructor(icon) {
        this.#element = this.#createElement();
        this.setIcon(icon);

        util.addEventListenerToCardContainer("custom:cardRemoved", _ => {
            if (!this.getCardFromCardsList()) {
                if (this.onRemove) this.onRemove();
                delete this;
            }
        });
    }

    setIcon(icon) {
        this.#icon = icon;
        const span = this.getElement().querySelector("span.material-symbols-outlined");
        span.textContent = icon;
    }

    getIcon() {
        return this.#icon;
    }

    getElement() {
        return this.#element;
    }

    getAssociatedItem() {
        const card = util.getCardFromElement(this.getElement())
        return util.getItemFromCard(card);;
    }

    getCardFromCardsList() {
        const item = this.getAssociatedItem();
        const allCards = util.getAllCards();
        const card = [...allCards].filter(card => item === util.getItemFromCard(card))[0];
        return card;
    }

    #createElement() {
        let btn = document.createElement("div");
        btn.classList.add("btn", "card-btn");

        const span = document.createElement("span");
        span.className = "material-symbols-outlined";
        span.textContent = this.getIcon();

        btn.onclick = (event) => {
            event.stopPropagation();

            if (this.onClick) {
                return this.onClick(event);
            }
        }

        btn.appendChild(span)

        return btn;
    }
}

export default Button;