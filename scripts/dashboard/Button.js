import { querySelectorUpwards } from "../Util/querySelectorUpwards.js";
import { getItemFromCard } from "./util.js";

class Button {
    #icon;
    #element;

    constructor(icon) {
        this.#element = this.#createElement();
        this.setIcon(icon);
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
        return getItemFromCard(this.getContainerCard());
    }

    getContainerCard() {
        return querySelectorUpwards(this.getElement(), ".folder-card, .link-card");
    }

    #createElement() {
        let btn = document.createElement("div");
        btn.className = "btn";

        const span = document.createElement("span");
        span.className = "material-symbols-outlined";
        span.textContent = this.getIcon();

        btn.onclick = (...args) => {
            if (this.onClick) {
                return this.onClick(...args);
            }
        }

        btn.appendChild(span)

        return btn;
    }
}

export default Button;