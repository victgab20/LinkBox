import DashboardState from "./dashboard/DashboardState.js";
import { searchBarInputListenerFn } from "./dashboard/searchBar.js";
import * as util from "./dashboard/util.js";

const searchBar = document.querySelector("#inputPesquisa");
const goBackBtn = document.querySelector(".go-back-btn");
const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");

searchBar.addEventListener("input", searchBarInputListenerFn);

[addBtn, addBtnMobile].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const answer = prompt("O que você quer adicionar?\n1 - Pasta\n2 - Link")
    const itemType = ["folder", "link"][answer - 1]

    if (itemType === "folder") {
      util.addFolderToUI();
    } else if (itemType === "link") {
      util.addLinkToUI();
    }
  });
});

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

util.addEventListenerToCardContainer("custom:cardAdded", () => hideEmptyFolderMessage());

util.addEventListenerToCardContainer("custom:cardRemoved", event => {
  if (event.detail.allCards.length == 0) showEmptyFolderMessage();
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

util.addEventListenerToCardContainer("custom:cardAdded", event => {
  const { card: clickedCard } = event.detail;

  clickedCard.addEventListener("click", () => {
    util.unselectAllCards();
    util.selectCard(clickedCard);
  })
})

document.querySelector("main").addEventListener("click", event => {
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
})

const allCards = util.getAllCards();

if (allCards.length == 0) showEmptyFolderMessage();
