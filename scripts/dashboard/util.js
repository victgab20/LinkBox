export const inputLinkInfo = () => {
    const url = prompt("Url: ");
    const name = prompt("Name: ");
    return { name, url }
}

export const getLinkImg = (link) => {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;
    const img = document.createElement("img");
    img.src = faviconUrl;
    return img
}

export const createLinkDataContainer = (link) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "link-data-container";

    const linkImg = getLinkImg(link);
    const infoContainer = createInfoContainer(link);

    dataContainer.appendChild(linkImg);
    dataContainer.appendChild(infoContainer);
    console.log(dataContainer)
    return dataContainer;
}

export const createInfoContainer = (link) => {
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

export const createLinkBtnsContainer = () => {
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

export const createLinkCard = (link) => {
    const linkCard = document.createElement("div");
    linkCard.className = "link-card";
    linkCard.appendChild(createLinkDataContainer(link));
    linkCard.appendChild(createLinkBtnsContainer(link));
    linkCard.style.backgroundColor = link.colorBackground
    return linkCard;
}

export const deletar = () => {
    const index = 2
    const main = document.querySelector("main");
    const childElement = main.childNodes[index]
    childElement.remove()
}

export const changeColor = () =>{
    const cards = document.getElementsByClassName('link-card')
    const card = Array.from(cards) 
    console.log(card)
    console.log(card[1].style.backgroundColor = 'blue')
    //card2.links.colorBackground = "green"
}