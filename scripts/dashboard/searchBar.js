import { getCardType } from "./util.js";

const getFolderInfoByCard = (card) => {
    const nameTag = card.querySelector(".folder-name");
    return { name: nameTag.textContent };
};

const getLinkInfoByCard = card => {
    const nameTag = card.querySelector(".link-name")
    const urlTag = card.querySelector(".link-url")

    return { name: nameTag.textContent, url: urlTag.textContent }
}

const includesQuery = (query, ...fields) => {
    for (const field of fields) {
        if (field.includes(query)) {
            return true;
        }
    }

    return false;
}

const getInfoByCard = card => {
    const cardType = getCardType(card);

    if (cardType === "link") {
        return getLinkInfoByCard(card);
    }

    return getFolderInfoByCard(card);
}

const filterOutUndefined = arr => arr.filter(val => val !== undefined);

export const searchBarInputListenerFn = event => {
    const query = event.target.value
    const cards = document.querySelectorAll(".folder-card, .link-card");

    [...cards].forEach(card => {
        const { name, url } = getInfoByCard(card);
        const hidden = query !== "" && !includesQuery(query, ...filterOutUndefined([name, url]));

        if (hidden) {
          card.classList.add("hidden");
        } else {
          card.classList.remove("hidden");
        }
    })
}
