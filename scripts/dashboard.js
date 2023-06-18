import DashboardState from "./dashboard/DashboardState.js";
import { searchBarInputListenerFn } from "./dashboard/searchBar.js";
import * as util from "./dashboard/util.js";
import { getCardsContainer } from "./dashboard/util.js";

const searchBar = document.querySelector("#inputPesquisa");
const goBackBtn = document.querySelector(".go-back-btn");
const addBtn = document.querySelector(".add-btn");
const cancelPasteBtn = document.querySelector(".cancel-paste-btn");
const pasteBtn = document.querySelector(".paste-btn");
const cardsFooter = document.querySelector(".cards-footer");
const cardsFooterCopyBtn = cardsFooter.querySelector(".copy-btn");
const cardsFooterCutBtn = cardsFooter.querySelector(".cut-btn");
const cardsFooterDeleteBtn = cardsFooter.querySelector(".delete-btn");

searchBar.addEventListener("input", searchBarInputListenerFn);

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const answer = prompt("O que você quer adicionar?\n1 - Pasta\n2 - Link")
  const itemType = ["folder", "link"][answer - 1]

  if (itemType === "folder") {
    util.addFolderToUI();
  } else if (itemType === "link") {
    util.addLinkToUI();
  }
});

cardsFooterCopyBtn.addEventListener("click", _ => {
  const dashboardState = new DashboardState();
  const selectedCards = util.getSelectedCards();
  const items = selectedCards.map(card => util.getItemFromCard(card));
  dashboardState.cancelCopy();
  dashboardState.cancelCut();
  dashboardState.setCopied(items);
});

const hideCancelPasteBtn = () => { cancelPasteBtn.classList.add("hidden") };

const hidePasteBtn = () => { pasteBtn.classList.add("hidden") };

const showCancelPasteBtn = () => { cancelPasteBtn.classList.remove("hidden") };

const showPasteBtn = () => {  pasteBtn.classList.remove("hidden") };

document.addEventListener("custom:copied", _ => { showCancelPasteBtn(); showPasteBtn() });

document.addEventListener("custom:cut", _ => { showCancelPasteBtn(); showPasteBtn() });

document.addEventListener("custom:cut", event => {
  const { items } = event.detail;
  const cards = items.map(util.getCardFromItem);
  cards.forEach(util.removeCardFromUI);
});

cardsFooterCutBtn.addEventListener("click", _ => {
  const dashboardState = new DashboardState();
  const selectedCards = util.getSelectedCards();
  const items = selectedCards.map(card => util.getItemFromCard(card));

  dashboardState.cancelCopy();
  dashboardState.cancelCut();

  dashboardState.setCut(items);
});

const removeSelectedCards = () => {
  util.getSelectedCards().forEach(util.removeCardFromUI);
}

cardsFooterDeleteBtn.addEventListener("click", removeSelectedCards);

cancelPasteBtn.addEventListener("click", (e) => {
  const dashboardState = new DashboardState();
  dashboardState.cancelCopy();
  dashboardState.cancelCut();
})

document.addEventListener("custom:cancelCopy", _ => { hideCancelPasteBtn(); hidePasteBtn() });

document.addEventListener("custom:cancelCut", _ => { hideCancelPasteBtn(); hidePasteBtn() });

document.addEventListener("custom:cancelCut", event => {
  const currentFolder = new DashboardState().getCurrentFolder();
  util.getAllCards().forEach(util.removeCardFromUI);
  currentFolder.getChildren().forEach(util.addItemToUI);
});

pasteBtn.addEventListener("click", _ => {
  const dashboardState = new DashboardState();
  const copied = dashboardState.getCopied().map(item => item.clone());
  const cut = dashboardState.getCut();

  if (copied.length > 0) {
    copied.forEach(util.addItemToUI)
  } else {
    cut.forEach(item => {
      item.getParent().removeChild(item);
      util.addItemToUI(item);
    })
  }

  hideCancelPasteBtn();
  hidePasteBtn();
})

goBackBtn.addEventListener("click", (e) => {
  const dashboardState = new DashboardState();
  const currentFolder = dashboardState.getCurrentFolder();
  const parent = currentFolder.getParent();

  if (parent) {
    dashboardState.setCurrentFolder(parent);
  }
})

const emptyFolderMessage = document.querySelector(".empty-folder-message");
const showEmptyFolderMessage = () => emptyFolderMessage.classList.remove("hidden");
const hideEmptyFolderMessage = () => emptyFolderMessage.classList.add("hidden");
const showCardsContainer = () => getCardsContainer().classList.remove("hidden");
const hideCardsContainer = () => getCardsContainer().classList.add("hidden");

util.addEventListenerToCardContainer("custom:cardAdded", () => {
  hideEmptyFolderMessage();
  showCardsContainer();
})

util.addEventListenerToCardContainer("custom:cardRemoved", event => {
  if (event.detail.allCards.length == 0) {
    showEmptyFolderMessage();
    hideCardsContainer();
  }
});

util.addEventListenerToCardContainer("custom:cardSelected", event => {
  const { card } = event.detail;
  card.style.backgroundColor = "";
  card.classList.add("card-selected");
})

util.addEventListenerToCardContainer("custom:cardUnselected", event => {
  const { card } = event.detail;
  card.classList.remove("card-selected");
  util.updateCard(card);
})

const createMessageForCardsFooter = selectedCardsAmount => {
  let message = `${selectedCardsAmount} `;
  message += `${selectedCardsAmount === 1 ? "Selecionado" : "Selecionados"}`;
  return message;
}

const updateCardsFooter = () => {
  const selectedCards = util.getSelectedCards();
  const textSelectedCards = cardsFooter.querySelector(".text-selected-cards")
  textSelectedCards.textContent = createMessageForCardsFooter(selectedCards.length);

  if (selectedCards.length === 0) {
    cardsFooter.classList.add("hidden");
  } else {
    cardsFooter.classList.remove("hidden");
  }
}

util.addEventListenerToCardContainer("custom:cardSelected", updateCardsFooter)

util.addEventListenerToCardContainer("custom:cardUnselected", updateCardsFooter)

util.addEventListenerToCardContainer("custom:cardRemoved", updateCardsFooter)

util.addEventListenerToCardContainer("custom:cardAdded", event => {
  const { card: clickedCard } = event.detail;

  clickedCard.addEventListener("click", () => {
    util.unselectAllCards();
    util.selectCard(clickedCard);
  })
})

util.getCardsContainer().addEventListener("click", event => {
  const element = event.target;
  if (!util.elementIsCard(element)) util.unselectAllCards();
})

document.addEventListener("custom:currentFolderChanged", event => {
  const { currentFolder } = event.detail;
  const childItems = currentFolder.getChildren();
  const allCards = util.getAllCards();

  allCards.forEach(util.removeCardFromUI);
  childItems.forEach(util.addItemToUI);

  if (currentFolder.isRoot()) {
    goBackBtn.classList.add("hidden");
  } else {
    goBackBtn.classList.remove("hidden");
  }

  const folderName = currentFolder.name;
  const folderNameElement = document.querySelector(".current-folder-name");

  if (folderName) {
    folderNameElement.textContent = currentFolder.name;
    folderNameElement.classList.remove("hidden");
  } else {
    folderNameElement.textContent = "";
    folderNameElement.classList.add("hidden");
  }
})

window.addEventListener("resize", _ => {
  util.getAllCards().forEach(card => {
    const isInSmallScreenWidth = new DashboardState().isInSmallScreenWidth();

    const customEvent = new CustomEvent(
      isInSmallScreenWidth ?
      "custom:disableToggleBtnsBasedOnHover" :
      "custom:enableToggleBtnsBasedOnHover"
    );

    card.dispatchEvent(customEvent);
  })
})

const allCards = util.getAllCards();

if (allCards.length == 0) showEmptyFolderMessage();
