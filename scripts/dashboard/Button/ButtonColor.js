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
        const card = this.getContainerCard();
        const item = util.getItemFromCard(card);
        const color = event.target.value;
        item.backgroundColor = color;

        if (!this.#changingColor) {
            const cardSelected = util.isCardSelected(card)
            this.#shouldSelectCardAfterColorChange = cardSelected;
            if (cardSelected) {
                util.unselectCard(card);
            }
        }

        this.#changingColor = true;

        util.updateCard(card);
    }

    #colorInputAfterChangeColor(_) {
        const card = this.getContainerCard();
        if (this.#shouldSelectCardAfterColorChange) util.selectCard(card);
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
            { type: "input", listener: target => this.#colorInputChangeColor(target) },
            { type: "change", listener: target => this.#colorInputAfterChangeColor(target) }
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