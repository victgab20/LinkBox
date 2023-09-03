import { searchBarInputListenerFn } from "./dashboard/searchBar.js";
import * as util from "./dashboard/util.js";

const searchBar = document.querySelector("#inputPesquisa");
const goBackBtn = document.querySelector(".go-back-btn");
const addBtn = document.querySelector(".add-btn");
const cancelPasteBtn = document.querySelector(".cancel-paste-btn");
const pasteBtn = document.querySelector(".paste-btn");
const cardsFooter = document.querySelector(".cards-footer");
const cardsFooterCopyBtn = cardsFooter.querySelector(".copy-btn");
const cardsFooterCutBtn = cardsFooter.querySelector(".cut-btn");
const cardsFooterDeleteBtn = cardsFooter.querySelector(".delete-btn");
const cardsContainer = util.getCardsContainer();

searchBar.addEventListener("input", searchBarInputListenerFn);
addBtn.addEventListener("click", util.add);
cardsFooterCopyBtn.addEventListener("click", util.copy);
document.addEventListener("custom:copied", util.onCopied);
document.addEventListener("custom:cut", util.onCut);
cardsFooterCutBtn.addEventListener("click", util.cut);
cardsFooterDeleteBtn.addEventListener("click", util.removeSelectedCardsAndItems);
cancelPasteBtn.addEventListener("click", util.cancelCopyAndCut);
document.addEventListener("custom:cancelCopy", util.onCancelCopy);
document.addEventListener("custom:cancelCut", util.onCancelCut);
pasteBtn.addEventListener("click", () => { util.paste(); util.onPaste(); });
goBackBtn.addEventListener("click", util.goToParentFolderIfItExists);
util.addEventListenerToCardContainer("custom:cardSelected", util.onCardSelected);
util.addEventListenerToCardContainer("custom:cardUnselected", util.onCardUnselected);
util.addEventListenerToCardContainer("custom:cardRemoved", util.onCardRemoved);
util.addEventListenerToCardContainer("custom:cardAdded", util.onCardAdded);
cardsContainer.addEventListener("click", util.onCardsContainerClick);
document.addEventListener("custom:currentFolderChanged", util.onCurrentFolderChanged);
window.addEventListener("resize", util.onResize);

const allCards = util.getAllCards();

if (allCards.length == 0) {
  const emptyFolderMessage = document.querySelector(".empty-folder-message");
  util.showElement(emptyFolderMessage);
}
