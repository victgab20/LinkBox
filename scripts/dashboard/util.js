import Button from "./Button.js";
import ButtonColor from "./Button/ButtonColor.js";
import ButtonCopy from "./Button/ButtonCopy.js";
import ButtonCut from "./Button/ButtonCut.js";
import ButtonDelete from "./Button/ButtonDelete.js";
import ButtonEdit from "./Button/ButtonEdit.js";
import ButtonSelect from "./Button/ButtonSelect.js";
import DashboardManager from "./DashboardManager.js";
import DashboardFolder from "./DashboardFolder.js";
import DashboardLink from "./DashboardLink.js";
import { addDragAndDropListenersToCard } from "./Util/cardDragAndDrop.js";

export const cloneCard = card => {
    card = card.cloneNode(true);
    const btnsContainer = card.querySelector(".btns-container");
    // Recreating btnsContainer is needed because just using element.cloneNode(true) doesn't clone the event listeners
    const newBtnsContainer = createBtnsContainer(getCardType(card));
    btnsContainer.insertAdjacentElement("afterend", newBtnsContainer);
    btnsContainer.remove();
    return card;
}

export const addClass = (element, className) => { element.classList.add(className) };

export const removeClass = (element, className) => { element.classList.remove(className) };

export const showElement = (element) => { removeClass(element, "hidden") };

export const hideElement = (element) => { addClass(element, "hidden") };

export const getItemType = item => item instanceof DashboardLink ? "link" : "folder";

const traverseAncestors = (element, predicate) => {
    let ancestor = element;

    while (ancestor) {
        if (predicate(ancestor)) return ancestor;
        ancestor = ancestor.parentElement;
    }

    return null;
}

export const getCardFromElement = element => {
    return traverseAncestors(element, ancestor => elementIsCard(ancestor));
}

export const getCardsContainer = () => {
    return document.querySelector(".cards-container");
}

export const isCardSelected = (card) => {
    return card.getAttribute("data-card-selected") !== null;
}

const selectCardWithoutEventDispatch = (card) => {
    card.setAttribute("data-card-selected", "");
}

const unselectCardWithoutEventDispatch = (card) => {
    card.removeAttribute("data-card-selected");
}

export const selectCard = (card) => {
    selectCardWithoutEventDispatch(card);
    dispatchCardEvent(new CustomEvent("custom:cardSelected", { detail: { card } }))
}

export const unselectCard = (card) => {
    unselectCardWithoutEventDispatch(card);
    dispatchCardEvent(new CustomEvent("custom:cardUnselected", { detail: { card } }))
}

export const selectAllCards = () => getAllCards().forEach(unselectCard);

export const unselectAllCards = () => getAllCards().forEach(unselectCard);

export const toggleCardSelection = (card) => {
    if (isCardSelected(card)) {
        unselectCard(card);
    } else {
        selectCard(card);
    }
}

export const getAllCards = () => {
    return getCardsContainer().querySelectorAll(".folder-card, .link-card");
}

export const getSelectedCards = () => [...getAllCards()].filter(isCardSelected);

export const elementIsCard = (element) => {
    const { classList } = element
    return classList.contains("folder-card") || classList.contains("link-card");
}

export const getCardType = card => card.classList.contains("link-card") ? "link" : "folder";

export const getItemFromCard = card => {
    const type = getCardType(card);
    const id = parseInt(card.getAttribute(`data-${type}-id`));
    const item = type === "folder" ? DashboardFolder.getById(id) : DashboardLink.getById(id);
    return item;
}

export const getItemFromId = (itemType, id) => {
    if (itemType === "folder") {
        return DashboardFolder.getById(id);
    } else {
        return DashboardLink.getById(id);
    }
}

export const getCardFromItem = item => {
    const itemType = getItemType(item);
    const itemId = item.getId();

    for (const card of getAllCards()) {
        let dataId = card.getAttribute(`data-${itemType}-id`);

        if (dataId && parseInt(dataId) === itemId) {
            return card;
        }
    }

    return null;
}

const updateFolderCard = (card) => {
    const item = getItemFromCard(card);
    card.querySelector(".folder-name").textContent = item.name;
}

const createLinkImgSrc = (link) => {
    return `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;;
}

const updateLinkCard = (card) => {
    const link = getItemFromCard(card);
    card.querySelector("img").src = createLinkImgSrc(link);
    card.querySelector(".link-title").textContent = link.title;
    card.querySelector(".link-url").textContent = link.url;
    if (!isCardSelected(card)) {
        card.style.backgroundColor = link.backgroundColor;
    }
}

export const updateCard = card => {
    const type = getCardType(card);

    if (type === "link") {
        updateLinkCard(card);
    } else {
        updateFolderCard(card);
    }
}

const inputItemTypeChoice = () => {
    const promptLines = "O que você quer adicionar?\n1 - Pasta\n2 - Link"
    const answer = prompt(promptLines)
    return ["folder", "link"][answer - 1]
}

export const inputFolderInfo = (defaultName) => {
    const name = prompt("Nome: ", defaultName);
    if (!name.trim()) return null;

    return { name }
}

export const inputLinkInfo = (defaultUrl, defaultTitle) => {
    const url = prompt("Url: ", defaultUrl);
    if (!url.trim()) return null;
    const title = prompt("Título: ", defaultTitle);
    if (!title.trim()) return null;

    return { title, url }
}

export const getLinkImg = (link) => {
    const img = document.createElement("img");
    img.src = createLinkImgSrc(link);
    return img
}

const createFolderDataContainer = (folder) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "folder-data-container";

    const span = document.createElement("span");
    span.className = "material-symbols-outlined";
    span.textContent = "folder";

    const iconContainer = document.createElement("div");
    iconContainer.className = "card-icon-container"
    iconContainer.appendChild(span);

    const p = document.createElement("p");
    p.className = "folder-name";
    p.textContent = folder.name;

    dataContainer.appendChild(iconContainer);
    dataContainer.appendChild(p);

    return dataContainer;
}

export const createLinkDataContainer = (link) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "link-data-container";

    const linkImg = getLinkImg(link);
    const infoContainer = createLinkInfoContainer(link);

    const iconContainer = document.createElement("div");
    iconContainer.className = "card-icon-container"
    iconContainer.appendChild(linkImg);

    dataContainer.appendChild(iconContainer);
    dataContainer.appendChild(infoContainer);

    return dataContainer;
}

export const createLinkInfoContainer = (link) => {
    const linkInfoContainer = document.createElement("div");
    const linkTitle = document.createElement("p");
    const linkUrl = document.createElement("p");

    linkTitle.textContent = link.title;
    linkTitle.className = "link-title";

    linkUrl.textContent = link.url;
    linkUrl.className = "link-url";

    linkInfoContainer.appendChild(linkTitle);
    linkInfoContainer.appendChild(linkUrl);
    linkInfoContainer.className = "info-container";

    return linkInfoContainer;
}

const createBtnsContainer = (parentCardType, buttons) => {
    if (!buttons) {
        buttons = ["check_box_outline_blank", "content_copy", "content_cut", "palette", "edit", "delete"];
    }

    buttons = buttons.map(btnName => {
        switch (btnName) {
            case "check_box_outline_blank":
                return new ButtonSelect().getElement()
            case "palette":
                return new ButtonColor().getElement()
            case "content_copy":
                return new ButtonCopy().getElement()
            case "content_cut":
                return new ButtonCut().getElement()
            case "edit":
                return new ButtonEdit().getElement()
            case "delete":
                return new ButtonDelete().getElement()
            default:
                return new Button(btnName).getElement()
        }
    })

    let btnsContainer = document.createElement("div");
    btnsContainer.classList.add(`${parentCardType}-btns-container`);
    btnsContainer.classList.add("btns-container");

    buttons.forEach((btn) => {
        btnsContainer.appendChild(btn)
    })

    if (DashboardManager.getInstance().isInSmallScreenWidth()) {
        showElement(btnsContainer);
    } else {
        hideElement(btnsContainer);
    }

    return btnsContainer;
}

const createDataContainer = (itemType, item) => {
  if (itemType === "folder") {
    return createFolderDataContainer(item);
  } else {
    return createLinkDataContainer(item);
  }
};

export const showCardBtns = (card, predicate) => {
    card.querySelectorAll(".card-btn").forEach(btn => {
        if (!predicate || predicate(btn)) showElement(btn);
    })
}

export const hideCardBtns = (card, predicate) => {
    card.querySelectorAll(".card-btn").forEach(btn => {
        if (!predicate || predicate(btn)) hideElement(btn);
    })
}

const showBtnsContainer = btnsContainer => { showElement(btnsContainer) };

const hideBtnsContainer = btnsContainer => { hideElement(btnsContainer) };

const addCardEventListeners = card => {
    const btnsContainer = card.querySelector(".btns-container");
    const predicate = btn => !btn.classList.contains("select-btn")

    card.addEventListener("mouseout", () => {
        if (card.enabledToggleBtnsBasedOnHover) {
            hideBtnsContainer(btnsContainer);
            hideCardBtns(card, predicate);
        }
    });

    card.addEventListener("mouseover", () => {
        showBtnsContainer(btnsContainer);
        if (card.enabledToggleBtnsBasedOnHover) showCardBtns(card);
    });

    card.addEventListener("custom:disableToggleBtnsBasedOnHover", event => {
        card.enabledToggleBtnsBasedOnHover = false;
        showBtnsContainer(btnsContainer);
        hideCardBtns(card, predicate);
    })

    card.addEventListener("custom:enableToggleBtnsBasedOnHover", event => {
        card.enabledToggleBtnsBasedOnHover = true;
        hideBtnsContainer(btnsContainer);
        showCardBtns(card);
    })

    addDragAndDropListenersToCard(card);
}

const createItemCardFactory = (itemType, item) => {
    return () => {
        const dashboardManager = DashboardManager.getInstance()
        const isInSmallScreenWidth = dashboardManager.isInSmallScreenWidth();
        const card = document.createElement("div");
        card.className = `${itemType}-card`;
        card.style.backgroundColor = item.backgroundColor;
        card.setAttribute(`data-${itemType}-id`, item.getId());
        card.setAttribute("draggable", "true");

        card.appendChild(createDataContainer(itemType, item));

        const btnsContainer = createBtnsContainer(itemType);
        card.appendChild(btnsContainer);

        card.enabledToggleBtnsBasedOnHover = !isInSmallScreenWidth;

        if (isInSmallScreenWidth) hideCardBtns(card, btn => !btn.classList.contains("select-btn"));
        addCardEventListeners(card);
        unselectCardWithoutEventDispatch(card);

        return card;
    }
}

export const createFolderCard = (folder) => createItemCardFactory("folder", folder)();

export const createLinkCard = (link) => createItemCardFactory("link", link)();

const createLink = () => {
    const linkInfo = inputLinkInfo();
    if (!linkInfo) return null;

    return new DashboardLink(linkInfo.title, linkInfo.url);
}

const createFolder = () => {
    const folderInfo = inputFolderInfo();
    if (!folderInfo) return null;

    return new DashboardFolder(folderInfo.name);
}

const createDashboardItem = (itemType) => {
    const creationStrategy = {
        link: createLink,
        folder: createFolder,
    }[itemType];

    if (creationStrategy) return creationStrategy();
}

const createCard = (itemType, itemInfo) => {
    if (itemType === "link") {
        return createLinkCard(itemInfo);
    } else {
        return createFolderCard(itemInfo);
    }
}

export const addEventListenerToCardContainer = (eventName, fn, options) => {
    getCardsContainer().addEventListener(eventName, fn, options);
}

export const removeEventListenerFromCardContainer = (eventName, fn, options) => {
    getCardsContainer().removeEventListener(eventName, fn, options);
}

export const dispatchCardEvent = event => {
    getCardsContainer().dispatchEvent(event);
}

const openFolder = folder => {
    const dashboardManager = DashboardManager.getInstance();
    dashboardManager.setCurrentFolder(folder)
}

const openLinkInNewTab = ({ url }) => {
    if (!!url && !/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
    }

    window.open(url, "_blank");
};

const doubleClickCardFn = card => {
    const item = getItemFromCard(card);

    if (getItemType(item) === "link") {
        openLinkInNewTab(item);
    } else {
        openFolder(item);
    }
}

const addDashboardItemToUI = (itemType, newItem) => {
    newItem = newItem ?? createDashboardItem(itemType);

    if (newItem) {
        const dashboardManager = DashboardManager.getInstance();
        const currentFolder = dashboardManager.getCurrentFolder();

        if (!currentFolder.contains(newItem)) {
            currentFolder.addChild(newItem);
            newItem.setParent(currentFolder);
        }

        const card = createCard(itemType, newItem)

        getCardsContainer().appendChild(card);

        card.addEventListener("dblclick", ({ target }) => {
            if (target === card) {
                doubleClickCardFn(card)
            }
        });

        dispatchCardEvent(new CustomEvent("custom:cardAdded", {
            detail: { type: itemType, item: newItem, card }
        }))
    }
}

export const removeCardFromUI = (card) => {
    const container = card.parentElement;
    const filteredContainerChildren = [...container.children].filter(child => child !== card);
    container.replaceChildren(...filteredContainerChildren);
    const cardType = getCardType(card);
    const id = parseInt(card.getAttribute(`data-${cardType}-id`));
    const item = cardType == "link" ? DashboardLink.getById(id) : DashboardFolder.getById(id)

    dispatchCardEvent(new CustomEvent("custom:cardRemoved", {
        detail: { type: cardType, item, card, allCards: getAllCards() }
    }))
}

const removeDashboardItemFromUI = (item) => {
    const card = getCardFromItem(item);

    if (card) {
        removeCardFromUI(card);
    }
}

export const addLinkToUI = (link) => addDashboardItemToUI("link", link);

export const addFolderToUI = (folder) => addDashboardItemToUI("folder", folder);

export const addItemToUI = (item) => {
    if (getItemType(item) === "link") {
        addLinkToUI(item);
    } else {
        addFolderToUI(item);
    }
}

export const removeItemFromUI = removeDashboardItemFromUI;

export const onResize = _ => {
    getAllCards().forEach(card => {
        const isInSmallScreenWidth = DashboardManager.getInstance().isInSmallScreenWidth();

        const customEvent = new CustomEvent(
            isInSmallScreenWidth ?
            "custom:disableToggleBtnsBasedOnHover" :
            "custom:enableToggleBtnsBasedOnHover"
        );

        card.dispatchEvent(customEvent);
        updateCardsFooter();
    })
}

export const onCurrentFolderChanged = event => {
    const goBackBtn = document.querySelector(".go-back-btn");
    const { currentFolder } = event.detail;
    const childItems = currentFolder.getChildren();
    const allCards = getAllCards();

    allCards.forEach(removeCardFromUI);
    childItems.forEach(addItemToUI);

    if (currentFolder.isRoot()) {
        hideElement(goBackBtn)
    } else {
        showElement(goBackBtn)
    }

    const folderName = currentFolder.name;
    const folderNameElement = document.querySelector(".current-folder-name");

    if (folderName) {
        folderNameElement.textContent = currentFolder.name;
        showElement(folderNameElement)
    } else {
        folderNameElement.textContent = "";
        hideElement(folderNameElement)
    }
}

export const onCardAdded = event => {
    const emptyFolderMessage = document.querySelector(".empty-folder-message");
    hideElement(emptyFolderMessage);
    showElement(getCardsContainer());
    const { card: clickedCard } = event.detail;

    clickedCard.addEventListener("click", () => {
        unselectAllCards();
        selectCard(clickedCard);
    })
}

export const goToParentFolderIfItExists = () => {
    const dashboardManager = DashboardManager.getInstance();
    const currentFolder = dashboardManager.getCurrentFolder();
    const parent = currentFolder.getParent();

    if (parent) {
        dashboardManager.setCurrentFolder(parent);
    }
}

export const add = () => {
    const itemType = inputItemTypeChoice();

    if (itemType === "folder") {
        addFolderToUI();
    } else if (itemType === "link") {
        addLinkToUI();
    }
}

export const copy = () => {
    const items = getSelectedItemsAndCancelCopyOrCut();
    DashboardManager.getInstance().setCopied(items);
}

export const cut = () => {
    const items = getSelectedItemsAndCancelCopyOrCut();
    DashboardManager.getInstance().setCut(items);
}

export const paste = () => {
    const dashboardManager = DashboardManager.getInstance();
    const copied = dashboardManager.getCopied().map(item => item.clone());
    const cut = dashboardManager.getCut();

    if (copied.length > 0) {
        copied.forEach(addItemToUI)
    } else {
        cut.forEach(item => {
            item.getParent().removeChild(item);
            addItemToUI(item);
        })
    }
}

const hideCancelPasteAndPasteBtns = () => {
    const cancelPasteBtn = document.querySelector(".cancel-paste-btn");
    const pasteBtn = document.querySelector(".paste-btn");
    hideElement(cancelPasteBtn);
    hideElement(pasteBtn);
}

const showCancelPasteAndPasteBtns = () => {
    const cancelPasteBtn = document.querySelector(".cancel-paste-btn");
    const pasteBtn = document.querySelector(".paste-btn");
    showElement(cancelPasteBtn);
    showElement(pasteBtn);
}

export const onCancelCut = () => {
    const currentFolder = DashboardManager.getInstance().getCurrentFolder();
    getAllCards().forEach(removeCardFromUI);
    currentFolder.getChildren().forEach(addItemToUI);
    hideCancelPasteAndPasteBtns();
}

export const cancelCopyAndCut = () => {
    const dashboardManager = DashboardManager.getInstance();
    dashboardManager.cancelCopy();
    dashboardManager.cancelCut();
}

export const getSelectedItemsAndCancelCopyOrCut = () => {
    const selectedCards = getSelectedCards();
    const items = selectedCards.map(card => getItemFromCard(card));
    cancelCopyAndCut();
    return items;
}

export const onCardRemoved = (e) => {
    if (e.detail.allCards.length == 0) {
        const emptyFolderMessage = document.querySelector(".empty-folder-message");
        showElement(emptyFolderMessage);
        hideElement(getCardsContainer());
    }

    updateCardsFooter();
}

export const onCardUnselected = (e) => {
    const { card } = e.detail;
    card.classList.remove("card-selected");
    updateCard(card);
    updateCardsFooter();
}

export const onCardSelected = (e) => {
    const { card } = e.detail;
    card.style.backgroundColor = "";
    card.classList.add("card-selected");
    updateCardsFooter();
}

export const onCut = (e) => {
    const { items } = e.detail;
    const cards = items.map(getCardFromItem);
    cards.forEach(removeCardFromUI);
    showCancelPasteAndPasteBtns();
}

export const removeSelectedCardsAndItems = () => {
    getSelectedCards().forEach(card => {
        const item = getItemFromCard(card);
        removeCardFromUI(card);
        item.remove();
    });
}

const originalCardsFooterBtnContainer = document.querySelector(".cards-footer-btn-container");

const replaceCardsFooterBtnContainer = (cardsFooter, newBtnsContainer) => {
    newBtnsContainer.classList.add("cards-footer-btn-container");
    const cardsFooterBtnContainer = cardsFooter.querySelector(".cards-footer-btn-container");

    if (cardsFooterBtnContainer === newBtnsContainer) {
        return;
    }

    cardsFooter.appendChild(newBtnsContainer);
    if (cardsFooterBtnContainer) cardsFooterBtnContainer.remove();
}

const restoreOriginalCardsFooterBtnContainer = cardsFooter => {
    replaceCardsFooterBtnContainer(cardsFooter, originalCardsFooterBtnContainer);
}

export const updateCardsFooter = () => {
    const cardsFooter = document.querySelector(".cards-footer");
    const isInSmallScreenWidth = DashboardManager.getInstance().isInSmallScreenWidth();
    const selectedCards = getSelectedCards();
    const textSelectedCards = cardsFooter.querySelector(".text-selected-cards")
    const AmountOfSelectedCards = selectedCards.length;
    textSelectedCards.textContent =
        `${AmountOfSelectedCards} ${AmountOfSelectedCards === 1 ? "Selecionado" : "Selecionados"}`;

    if (AmountOfSelectedCards > 1) {
        restoreOriginalCardsFooterBtnContainer(cardsFooter);
        showElement(cardsFooter);
        return;
    } else if (AmountOfSelectedCards === 0 || !isInSmallScreenWidth) {
        restoreOriginalCardsFooterBtnContainer(cardsFooter);
        hideElement(cardsFooter);
        return;
    }

    const firstSelectedCard = cloneCard(selectedCards[0]);
    firstSelectedCard.style.backgroundColor = "#00000000";
    const dataContainer = firstSelectedCard.querySelector(".link-data-container, .folder-data-container");
    hideElement(dataContainer);
    const cardBtnsContainers = firstSelectedCard.querySelector(".btns-container");
    showCardBtns(cardBtnsContainers);
    hideCardBtns(cardBtnsContainers, btn => btn.classList.contains("select-btn"));
    replaceCardsFooterBtnContainer(cardsFooter, firstSelectedCard);
    showElement(cardsFooter);
}

export const onCancelCopy = hideCancelPasteAndPasteBtns;

export const onPaste = hideCancelPasteAndPasteBtns;

export const onCopied = showCancelPasteAndPasteBtns;

export const onCardsContainerClick = (e) => {
    const element = e.target;
    if (!elementIsCard(element)) {
        unselectAllCards();
    }
}