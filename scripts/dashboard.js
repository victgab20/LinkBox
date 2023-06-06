const links = [
    { name: "Google", url: "https://google.com/", colorBackground: "white" }
]

const getLinkImg = (link) => {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;
    const img = document.createElement("img");
    img.src = faviconUrl;
    return img
}

const createLinkDataContainer = (link) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "link-data-container";

    const linkImg = getLinkImg(link);
    const infoContainer = createInfoContainer(link);

    dataContainer.appendChild(linkImg);
    dataContainer.appendChild(infoContainer);
    console.log(dataContainer)
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

        if(btnName === "delete"){
            span.setAttribute('onclick', 'deletar()')
        }
        if(btnName === "palette"){
            span.setAttribute('onclick', 'changeColor()')
        }

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
    linkCard.style.backgroundColor = link.colorBackground
    return linkCard;
}


const main = document.querySelector("main");
const addBtn = document.querySelector(".add-btn");
const addBtnMobile = document.querySelector(".add-btn-mobile");
//const card = document.querySelector('.link-card')

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    main.appendChild(createLinkCard(links[0]));
})
addBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();

    main.appendChild(createLinkCard(links[0]));
})

const deletar = () => {
    const index = 2
    const childElement = main.childNodes[index]
    childElement.remove()
}

const changeColor = () =>{

    const cards = document.getElementsByClassName('link-card')
    const card = Array.from(cards) 
    console.log(card)
    console.log(card[1].style.backgroundColor = 'blue')
    //card2.links.colorBackground = "green"

}