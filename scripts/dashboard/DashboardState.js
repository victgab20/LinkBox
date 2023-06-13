import Folder from "./Folder.js";

class DashboardState {
  #cut = [];
  #copied = [];
  #previousFolder;
  #currentFolder;

  constructor() {
    if (!DashboardState.instance) {
      this.setCurrentFolder(new Folder());
      DashboardState.instance = this;
    }

    return DashboardState.instance;
  }

  isInSmallScreenWidth() {
    return window.innerWidth <= 651;
  }

  cancelCopy() {
    const items = this.#copied;
    this.#copied = [];
    document.dispatchEvent(new CustomEvent("custom:cancelCopy", { detail: { items }}));
  }

  cancelCut() {
    const items = this.#cut;
    this.#cut = [];
    document.dispatchEvent(new CustomEvent("custom:cancelCut", { detail: { items }}));
  }

  getCopied() {
    return this.#copied;
  }

  getCut() {
    return this.#cut;
  }

  setCopied(items) {
    this.#cut = [];
    this.#copied = items;

    const copiedEvent = new CustomEvent("custom:copied", { detail: { items } });
    document.dispatchEvent(copiedEvent);
  }

  setCut(items) {
    this.#copied = [];
    this.#cut = items;

    const cutEvent = new CustomEvent("custom:cut", { detail: { items } });
    document.dispatchEvent(cutEvent)
  }

  getPreviousFolder() {
    return this.#previousFolder;
  }

  getCurrentFolder() {
      return this.#currentFolder;
  }

  setCurrentFolder(folder) {
      const previousFolder = this.#currentFolder;
      this.#currentFolder = folder;
      this.#previousFolder = previousFolder;

      const folderChangedEvent = new CustomEvent("custom:currentFolderChanged", {
          detail: {
            previousFolder,
            currentFolder: this.#currentFolder
          }
      });

      document.dispatchEvent(folderChangedEvent)
  }
}

export default DashboardState;