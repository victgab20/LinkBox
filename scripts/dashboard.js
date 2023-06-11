import Link from "./dashboard/Link.js";
import { searchBarInputListenerFn } from "./dashboard/searchBar.js";
import * as util from "./dashboard/util.js";

const searchBar = document.querySelector("#inputPesquisa");
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

const emptyFolderMessage = document.querySelector(".empty-folder-message");
const showEmptyFolderMessage = () => emptyFolderMessage.classList.remove("hidden");
const hideEmptyFolderMessage = () => emptyFolderMessage.classList.add("hidden");

util.addEventListenerToCardContainer("custom:cardAdded", () => hideEmptyFolderMessage());

util.addEventListenerToCardContainer("custom:cardRemoved", event => {
  if (event.detail.allCards.length == 0) showEmptyFolderMessage();
});

util.addEventListenerToCardContainer("custom:cardSelected", event => {
  event.detail.card.classList.add("card-selected");
})

util.addEventListenerToCardContainer("custom:cardUnselected", event => {
  event.detail.card.classList.remove("card-selected");
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

const allCards = util.getAllCards();

if (allCards.length == 0) showEmptyFolderMessage();
