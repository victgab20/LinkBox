import * as util from "./dashboard/util.js";

const links = [
    { name: "Google", url: "https://google.com/", colorBackground: "white" }
]

const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const main = document.querySelector("main");
    main.appendChild(util.createLinkCard(links[0]));
})

addBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();

    const main = document.querySelector("main");
    main.appendChild(util.createLinkCard(links[0]));
})