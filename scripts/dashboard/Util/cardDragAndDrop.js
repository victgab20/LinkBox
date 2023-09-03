import DashboardManager from "../DashboardManager.js";
import * as util from "../util.js";

const CARD_CENTER_MAX_OFFSET = 0.2;

const listenerFns = {
    onDragStart: (e, card) => {
        setDragData(e, card);
        e.dataTransfer.effectAllowed = "move";

        const selectedCards = util.getSelectedCards();
        if (selectedCards.length > 0 && !util.isCardSelected(card)) {
            util.unselectAllCards();
        }

        setDragImage(e, createDragImage(card));
    },
    onDragEnd: e => {
        e.preventDefault();

        util.getCardsContainer()
            .querySelectorAll(".card-drag-over-center, .card-drag-over-below, .card-drag-over-above")
            .forEach(card => removeDragRelatedClasses(card))

        removeDragImage();
    },
    onDragLeave: (e, card) => {
        e.preventDefault();
        removeDragRelatedClasses(card);
    },
    onDrop: (e) => {
        e.preventDefault();

        const dragData = getDragData(e);
        let { draggedCard } = getDraggedCardFromDragData(dragData);
        const cardUnderDrop = util.getCardFromElement(e.target)
        const { positionRelativeToCenter, isPositionCloseToCenter } =
            getClientVerticalPositionRelativeToElementCenter(e, cardUnderDrop, CARD_CENTER_MAX_OFFSET);
        const draggedCards = getAllDraggedCards(draggedCard);

        const itemOfCardUnderDrop = util.getItemFromCard(cardUnderDrop);

        if (draggedCards.includes(cardUnderDrop)) {
            return;
        }

        if (isPositionCloseToCenter && util.getItemType(itemOfCardUnderDrop) === "folder") {
            draggedCards.forEach(draggedCard => {
                moveCardToAnotherFolder(draggedCard, itemOfCardUnderDrop)
            });
            return;
        }

        const isDragBetweenUnselectedCards = isCardBetweenUnselectedCards(cardUnderDrop, positionRelativeToCenter);
        if (!isDragBetweenUnselectedCards) return;

        draggedCards.forEach((draggedCard, idx, allDraggedCards) => {
            let where, baseCard, baseItem, newItemIdx;
            const draggedItem = util.getItemFromCard(draggedCard);
            const currentFolder = DashboardManager.getInstance().getCurrentFolder();

            if (positionRelativeToCenter === "above") {
                where = "beforebegin";
                baseCard = cardUnderDrop;
            } else {
                where = "afterend";
                baseCard = allDraggedCards[idx - 1] ?? cardUnderDrop;
            }

            baseItem = util.getItemFromCard(baseCard);
            newItemIdx = currentFolder.getChildIndex(baseItem);

            if (where === "afterend") {
                newItemIdx++;
            }

            baseCard.insertAdjacentElement(where, draggedCard);
            currentFolder.moveChild(draggedItem, newItemIdx);
        })
    },
    onDragOver: (e, card) => {
        e.preventDefault();

        removeDragRelatedClasses(card);

        const { positionRelativeToCenter, isPositionCloseToCenter } =
            getClientVerticalPositionRelativeToElementCenter(e, card, CARD_CENTER_MAX_OFFSET);

        if (isCardBetweenUnselectedCards(card, positionRelativeToCenter)) {
            addDragOverClass(card, { positionRelativeToCenter, isPositionCloseToCenter });
        }
    }
}

const setDragData = (e, card) => {
    const item = util.getItemFromCard(card);
    const dragData = { itemType: util.getItemType(item), itemId: item.getId() };
    e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
}

const getDragData = e => JSON.parse(e.dataTransfer.getData("text/plain"));

let setDragImage;
let getDragImage;
let removeDragImage;

{
    let currentDragImage = null;

    setDragImage = (e, dragImage) => {
        e.dataTransfer.setDragImage(dragImage, 0, 0);
        currentDragImage = dragImage;
    }

    getDragImage = () => {
        return currentDragImage;
    }

    removeDragImage = () => {
        if (currentDragImage) {
            currentDragImage.remove();
            currentDragImage = null;
        }
    }
}

const createNumberIndicatorForDragImage = amountOfDraggedCards => {
    const indicatorContainer = document.createElement("div");
    const indicator = document.createElement("p")
    indicatorContainer.classList.add("dragged-number-indicator-container");
    indicator.textContent = amountOfDraggedCards.toString();
    indicatorContainer.appendChild(indicator);

    return indicatorContainer;
}

const getDraggedCardFromDragData = dragData => {
    const item = util.getItemFromId(dragData.itemType, dragData.itemId);
    return { draggedCard: util.getCardFromItem(item) };
}

// dragImage only works with an html element if said element is in the DOM.
// Thus, we need to add it to the document body and hide it from the user
const addDragImageHiddenInDocumentBody = dragImage => {
    dragImage.style.position = "absolute";
    document.body.appendChild(dragImage);
    dragImage.style.top = `-${dragImage.clientHeight}px`;
}

const createDragImage = card => {
    const cardClone = card.cloneNode(true);
    util.hideCardBtns(cardClone);

    const amountOfDraggedCards = getAllDraggedCards(card).length;

    if (amountOfDraggedCards > 1) {
        const numberIndicator = createNumberIndicatorForDragImage(amountOfDraggedCards);
        cardClone.appendChild(numberIndicator);
    }

    const dragImage = document.createElement("div");
    dragImage.appendChild(cardClone);
    dragImage.classList.add("drag-image");

    addDragImageHiddenInDocumentBody(dragImage);

    return dragImage;
}

const getClientVerticalPositionRelativeToElementCenter = (e, element, centerMaxOffset) => {
    const clientY = e.clientY;
    const { top, height } = element.getBoundingClientRect();
    const center = top + height / 2;
    const positionRelativeToCenter = clientY >= center ? "below" : "above";
    let isPositionCloseToCenter;

    if (centerMaxOffset) {
        if (centerMaxOffset > 0 && centerMaxOffset < 1) {
            centerMaxOffset = Math.round(centerMaxOffset * height);
        }

        isPositionCloseToCenter = clientY >= center - centerMaxOffset && clientY <= center + centerMaxOffset;
    }

    return { positionRelativeToCenter, isPositionCloseToCenter };
}

const getAllDraggedCards = draggedCard => {
    let draggedCards = util.getSelectedCards();

    if (!draggedCards.includes(draggedCard)) {
        draggedCards.push(draggedCard);
    }

    return draggedCards;
}

const isCardBetweenUnselectedCards = (card, positionRelativeToCenter) => {
    let result;

    if (positionRelativeToCenter === "above") {
        const previousCard = card.previousSibling;
        const previousCardSelected = !!previousCard && util.isCardSelected(previousCard);
        result = !previousCardSelected && !util.isCardSelected(card);
    } else {
        const nextCard = card.nextSibling;
        const nextCardSelected = !!nextCard && util.isCardSelected(nextCard);
        result = !nextCardSelected && !util.isCardSelected(card);
    }

    return result;
}

const removeDragRelatedClasses = card => {
    util.removeClass(card, "card-drag-over-center");
    util.removeClass(card, "card-drag-over-below");
    util.removeClass(card, "card-drag-over-above");

    const previousCard = card.previousSibling;

    if (previousCard) {
        util.removeClass(previousCard, "card-drag-over-below");
    }
}

const addDragOverClass = (card, { positionRelativeToCenter, isPositionCloseToCenter }) => {
    let className;
    const cardType = util.getCardType(card);
    const previousCard = card.previousSibling;

    if (cardType === "folder" && isPositionCloseToCenter) {
        className = "card-drag-over-center";
    } else if (positionRelativeToCenter === "below") {
        className = "card-drag-over-below";
    } else if (previousCard) {
        card = previousCard;
        className = "card-drag-over-below";
    } else {
        className = "card-drag-over-above";
    }

    util.addClass(card, className);
}

const moveCardToAnotherFolder = (card, folder) => {
    const item = util.getItemFromCard(card);
    const currentFolder = DashboardManager.getInstance().getCurrentFolder();
    currentFolder.moveChildToAnotherFolder(item, folder);
    util.removeCardFromUI(card);
}

export const addDragAndDropListenersToCard = card => {
    card.addEventListener("dragstart", e => listenerFns.onDragStart(e, card), false)
    card.addEventListener("dragover", e => listenerFns.onDragOver(e, card));
    card.addEventListener("dragleave", e => listenerFns.onDragLeave(e, card))
    card.addEventListener("dragend", listenerFns.onDragEnd)
    card.addEventListener("drop", listenerFns.onDrop)
}
