import DashboardItem from "./DashboardItem.js";

class DashboardLink extends DashboardItem {
  constructor(title, url, backgroundColor) {
    super();
    this.title = title;
    this.url = url;
    this.backgroundColor = backgroundColor;
  }

  clone() {
    const clonedLink = new DashboardLink(
      this.title,
      this.url,
      this.backgroundColor
    );
    clonedLink.setParent(this.getParent());
    return clonedLink;
  }

  remove() {
    this.getParent().removeChild(this);
  }
}

export default DashboardLink;