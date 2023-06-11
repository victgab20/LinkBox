import { querySelectorUpwards } from "../Util/querySelectorUpwards.js";
import { addEventListenerToCardContainer, getItemFromCard } from "./util.js";

class Button {
    #icon;
    #element;

    constructor(icon) {
        this.#element = this.#createElement();
        this.setIcon(icon);

        addEventListenerToCardContainer("custom:cardRemoved", _ => {
            if (!this.getContainerCard()) {
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