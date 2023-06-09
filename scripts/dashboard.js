import * as util from "./dashboard/util.js";

const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");

[addBtn, addBtnMobile].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    util.addLinkToUI();
  });
});
