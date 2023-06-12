import Folder from "./Folder.js";

class DashboardState {
  #previousFolder;
  #currentFolder;

  constructor() {
    if (!DashboardState.instance) {
      this.setCurrentFolder(new Folder());
      DashboardState.instance = this;
    }

    return DashboardState.instance;
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