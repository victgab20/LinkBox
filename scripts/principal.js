const links = [
    { name: "Google", url: "https://google.com/" }
]

const createLinkDataContainer = (link) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "link-data-container";

    const linkImg = document.createElement("img");
    linkImg.src = "imagem/Google logo.svg";
    linkImg.alt = "Google logo";

    const infoContainer = createInfoContainer(link);

    dataContainer.appendChild(linkImg);
    dataContainer.appendChild(infoContainer);

    return dataContainer;
}

const createInfoContainer = (link) => {
    const linkInfoContainer = document.createElement("div");
    const linkName = document.createElement("p");
    const linkUrl = document.createElement("p");

    linkName.textContent = link.name;
    linkName.className = "link-name";

    linkUrl.textContent = link.url;
    linkUrl.className = "link-url";

    linkInfoContainer.appendChild(linkName);
    linkInfoContainer.appendChild(linkUrl);
    linkInfoContainer.className = "info-container";

    return linkInfoContainer;
}

const createLinkBtnsContainer = () => {
    let buttons = ["check_box_outline_blank", "content_copy", "content_cut", "expand_more", "palette", "edit", "delete"];

    buttons = buttons.map((btnName) =>  {
        let btn = document.createElement("div");
        btn.className = "btn";

        const span = document.createElement("span");
        span.className = "material-symbols-outlined";
        span.textContent = btnName;

        btn.appendChild(span)

        return btn;
    })

    let btnsContainer = document.createElement("div");
    btnsContainer.classList.add("link-btns-container");
    btnsContainer.classList.add("btns-container");

    buttons.forEach((btn) => {
        btnsContainer.appendChild(btn)
    })

    return btnsContainer;
}

const createLinkCard = (link) => {
    const linkCard = document.createElement("div");
    linkCard.className = "link-card";
    linkCard.appendChild(createLinkDataContainer(link));
    linkCard.appendChild(createLinkBtnsContainer(link));

    return linkCard;
}

const main = document.querySelector("main");
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    main.appendChild(createLinkCard(links[0]));
})