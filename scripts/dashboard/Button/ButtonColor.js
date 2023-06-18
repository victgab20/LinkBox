import Button from "../Button.js";
import * as util from "../util.js";

class ButtonColor extends Button {
    #colorInput;
    #colorInputEventListeners = [];
    #changingColor;
    #shouldSelectCardAfterColorChange;

    constructor() {
        super("palette");
        this.#colorInput = this.#createColorInput();
        const element = this.getElement();
        element.classList.add("color-btn");
        element.appendChild(this.#getColorInput())
    }

    #getColorInput() {
        return this.#colorInput;
    }

    #colorInputChangeColor(event) {
        const card = this.getCardFromCardsList();
        const item = util.getItemFromCard(card);
        const color = event.target.value;
        item.backgroundColor = color;

        if (!this.#changingColor) {
            const cardSelected = card.classList.contains("card-selected");
            this.#shouldSelectCardAfterColorChange = cardSelected;
            if (cardSelected) {
                card.classList.remove("card-selected");
            }
        }

        this.#changingColor = true;

        card.style.backgroundColor = color;
    }

    #colorInputAfterChangeColor(_) {
        const card = this.getCardFromCardsList();
        if (this.#shouldSelectCardAfterColorChange) {
            card.classList.add("card-selected")
            card.style.backgroundColor = null;
        }
        this.#changingColor = false;
    }

    #createColorInput() {
        let colorInput = this.#getColorInput();

        if (colorInput) return this.#getColorInput();

        colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.classList.add("color-input");

        const eventListeners = [
            // NOTE: arrow function is needed because of `this` context
            { type: "input", listener: event => this.#colorInputChangeColor(event) },
            { type: "change", listener: event => this.#colorInputAfterChangeColor(event) }
        ]

        eventListeners.forEach((eventListener) => {
            this.#colorInputEventListeners.push(eventListener);
            colorInput.addEventListener(eventListener.type, eventListener.listener);
        });

        return colorInput;
    }

    onClick() {
        this.#getColorInput().click();
    }

    onRemove() {
        this.#colorInputEventListeners.forEach(({ type, listener }) => {
            this.#getColorInput().removeEventListener(type, listener);
        })
    }
}

export default ButtonColor;