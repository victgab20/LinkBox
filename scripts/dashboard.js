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

const main = document.querySelector("main");
const emptyFolderMessage = document.querySelector(".empty-folder-message");
const showEmptyFolderMessage = () => emptyFolderMessage.classList.remove("hidden");
const hideEmptyFolderMessage = () => emptyFolderMessage.classList.add("hidden");

main.addEventListener("custom:cardAdded", () => hideEmptyFolderMessage());

main.addEventListener("custom:cardRemoved", event => {
  if (event.detail.allCards.length == 0) showEmptyFolderMessage();
});

const allCards = document.querySelectorAll(".link-card, .folder-card");

if (allCards.length == 0) showEmptyFolderMessage();
