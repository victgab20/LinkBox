export const querySelectorUpwards = (element, query) => {
    element = element.parentElement;

    while (element) {
        let parentElement = element.parentElement;

        if (!parentElement) break;

        // Getting all elements selected helps handling special cases like `or` querys, e.g.:
        // ".this-element, .that-element"
        let elementsFound = parentElement.querySelectorAll(query);

        for (const elementFound of elementsFound) {
            if (elementFound === element) {
                return elementFound;
            }
        }

        element = parentElement;
    }

    return null;
}