import Button from "../Button.js";
import { addEventListenerToCardContainer, isCardSelected, selectCard, unselectCard } from "../util.js";

class ButtonSelect extends Button {
    #iconSelected;
    #iconUnselected;

    constructor(selected) {
        const iconSelected = "check_box";
        const iconUnselected = "check_box_outline_blank";
        super(selected ? iconSelected : iconUnselected);
        this.#iconSelected = iconSelected;
        this.#iconUnselected = iconUnselected;
        addEventListenerToCardContainer("custom:cardSelected", e => { this.#updateIcon() });
        addEventListenerToCardContainer("custom:cardUnselected", e => { this.#updateIcon() });
    }

    #isSelected() {
        return isCardSelected(this.getContainerCard());
    }

    #updateIcon() {
        this.setIcon(this.#isSelected() ? this.#iconSelected : this.#iconUnselected);
    }

    #select() {
        selectCard(this.getContainerCard());
        this.#updateIcon();
    }

    #unselect() {
        unselectCard(this.getContainerCard());
        this.#updateIcon();
    }

    #toggleSelection() {
        if (this.#isSelected()) {
            this.#unselect();
        } else {
            this.#select();
        }
    }

    onClick() {
        this.#toggleSelection();
    }
}

export default ButtonSelect;