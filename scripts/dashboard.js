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
