import Button from "./Button.js";
import Folder from "./Folder.js";
import Link from "./Link.js";

export const getCardType = card => card.classList.contains("link-card") ? "link" : "folder";

export const inputFolderInfo = () => {
    const name = prompt("Name: ");
    if (!name.trim()) return null;

    return { name }
}

export const inputLinkInfo = () => {
    const url = prompt("Url: ");
    if (!url.trim()) return null;
    const name = prompt("Name: ");
    if (!name.trim()) return null;

    return { name, url }
}

export const getLinkImg = (link) => {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;
    const img = document.createElement("img");
    img.src = faviconUrl;
    return img
}

const createFolderDataContainer = (folder) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "folder-data-container";

    const span = document.createElement("span");
    span.className = "material-symbols-outlined";
    span.textContent = "folder";

    const p = document.createElement("p");
    p.className = "folder-name";
    p.textContent = folder.name;

    dataContainer.appendChild(span);
    dataContainer.appendChild(p);

    return dataContainer;
}

export const createLinkDataContainer = (link) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "link-data-container";

    const linkImg = getLinkImg(link);
    const infoContainer = createLinkInfoContainer(link);

    dataContainer.appendChild(linkImg);
    dataContainer.appendChild(infoContainer);

    return dataContainer;
}

export const createLinkInfoContainer = (link) => {
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

const createBtnsContainer = (parentCardType, buttons) => {
    if (!buttons) {
        buttons = ["check_box_outline_blank", "content_copy", "content_cut", "expand_more", "palette", "edit", "delete"];
    }

    buttons = buttons.map(btnName => new Button(btnName).getElement())

    let btnsContainer = document.createElement("div");
    btnsContainer.classList.add(`${parentCardType}-btns-container`);
    btnsContainer.classList.add("btns-container");

    buttons.forEach((btn) => {
        btnsContainer.appendChild(btn)
    })

    btnsContainer.classList.add("hidden");

    return btnsContainer;
}

const createDataContainer = (itemType, item) => {
  if (itemType === "folder") {
    return createFolderDataContainer(item);
  } else {
    return createLinkDataContainer(item);
  }
};

const createItemCardFactory = (itemType, item) => {
    return () => {
        const card = document.createElement("div");
        card.className = `${itemType}-card`;
        card.style.backgroundColor = item.backgroundColor;
        card.setAttribute(`data-${itemType}-id`, item.getId());

        card.appendChild(createDataContainer(itemType, item));

        const btnsContainer = createBtnsContainer(itemType);
        card.appendChild(btnsContainer);

        card.addEventListener("mouseout", () => btnsContainer.classList.add("hidden"));
        card.addEventListener("mouseover", () => btnsContainer.classList.remove("hidden"));

        return card;
    }
}

export const createFolderCard = (folder) => createItemCardFactory("folder", folder)();

export const createLinkCard = (link) => createItemCardFactory("link", link)();


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

const createLink = () => {
    const linkInfo = inputLinkInfo();
    if (!linkInfo) return null;

    return new Link(linkInfo.name, linkInfo.url);
}

const createFolder = () => {
    const folderInfo = inputFolderInfo();
    if (!folderInfo) return null;

    return new Folder(folderInfo.name);
}

const createManageableItem = (itemType) => {
    const creationStrategy = {
        link: createLink,
        folder: createFolder,
    }[itemType];

    if (creationStrategy) return creationStrategy();
}

const createCard = (itemType, itemInfo) => {
    if (itemType === "link") {
        return createLinkCard(itemInfo);
    } else {
        return createFolderCard(itemInfo);
    }
}

const addManageableItemToUI = (itemType) => {
    const main = document.querySelector("main");
    const newItem = createManageableItem(itemType);

    if (newItem) {
        main.appendChild(createCard(itemType, newItem));
    }
}

export const addLinkToUI = () => addManageableItemToUI("link");

export const addFolderToUI = () => addManageableItemToUI("folder");
