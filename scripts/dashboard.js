import * as util from "./dashboard/util.js";

const links = [
    { name: "Google", url: "https://google.com/", colorBackground: "white" }
]

const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");

const addLink = () => {
    const link = util.inputLinkInfo();
    links.push(link);
    return link;
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