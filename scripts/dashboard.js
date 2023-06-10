import { searchBarInputListenerFn } from "./dashboard/searchBar.js";
import * as util from "./dashboard/util.js";

const searchBar = document.querySelector("#inputPesquisa");
const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");

searchBar.addEventListener("input", searchBarInputListenerFn);

[addBtn, addBtnMobile].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    util.addLinkToUI();
  });
});
