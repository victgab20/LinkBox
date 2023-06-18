import Button from "../Button.js";
import * as util from "../util.js";

class ButtonSelect extends Button {
    #iconSelected;
    #iconUnselected;

    constructor(selected) {
        const iconSelected = "check_box";
        const iconUnselected = "check_box_outline_blank";
        super(selected ? iconSelected : iconUnselected);
        this.#iconSelected = iconSelected;
        this.#iconUnselected = iconUnselected;

        const eventListenerFn = _ => { this.#updateIcon() };
        util.addEventListenerToCardContainer("custom:cardSelected", eventListenerFn);
        util.addEventListenerToCardContainer("custom:cardUnselected", eventListenerFn);

        this.onRemove = () => {
            util.removeEventListenerFromCardContainer("custom:cardSelected", eventListenerFn)
            util.removeEventListenerFromCardContainer("custom:cardUnselected", eventListenerFn)
        }
    }

    getElement() {
        const element = super.getElement();
        element.classList.add("select-btn");
        return element;
    }

    #isSelected() {
        return util.isCardSelected(this.getCardFromCardsList());
    }

    #updateIcon() {
        this.setIcon(this.#isSelected() ? this.#iconSelected : this.#iconUnselected);
    }

    #select() {
        util.selectCard(this.getCardFromCardsList());
        this.#updateIcon();
    }

    #unselect() {
        util.unselectCard(this.getCardFromCardsList());
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