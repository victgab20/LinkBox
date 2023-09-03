import DashboardFolder from "./DashboardFolder.js";

class DashboardManager {
  static #isInternalConstructing = false;
  #cut = [];
  #copied = [];
  #previousFolder;
  #currentFolder;

  constructor() {
    if (!DashboardManager.#isInternalConstructing) {
      const errorMessage =
        "Attempt to create or get singleton instance via constructor, use getInstance() instead";
      throw new Error(errorMessage);
    }

    if (!DashboardManager.instance) {
      this.setCurrentFolder(new DashboardFolder());
      DashboardManager.instance = this;
    }

    DashboardManager.#isInternalConstructing = false;

    return DashboardManager.instance;
  }

  static getInstance() {
    DashboardManager.#isInternalConstructing = true;
    return new DashboardManager();
  }

  isInSmallScreenWidth() {
    return window.innerWidth <= 651;
  }

  cancelCopy() {
    const items = this.#copied;
    this.#copied = [];
    document.dispatchEvent(
      new CustomEvent("custom:cancelCopy", { detail: { items } })
    );
  }

  cancelCut() {
    const items = this.#cut;
    this.#cut = [];
    document.dispatchEvent(
      new CustomEvent("custom:cancelCut", { detail: { items } })
    );
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
    document.dispatchEvent(cutEvent);
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
        currentFolder: this.#currentFolder,
      },
    });

    document.dispatchEvent(folderChangedEvent);
  }
}

export default DashboardManager;