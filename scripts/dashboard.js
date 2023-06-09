import Link from "./dashboard/Link.js";
import * as util from "./dashboard/util.js";

const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");

const addLink = () => {
    const { name, url } = util.inputLinkInfo();
    return new Link(name, url);
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const main = document.querySelector("main");
    const newLink = addLink();
    main.appendChild(util.createLinkCard(newLink));
})

addBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();

    const main = document.querySelector("main");
    const newLink = addLink();
    main.appendChild(util.createLinkCard(newLink));
})