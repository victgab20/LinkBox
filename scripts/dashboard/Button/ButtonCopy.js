import Button from "../Button.js";
import DashboardManager from "../DashboardManager.js";

class ButtonCopy extends Button {
    constructor() {
        super("content_copy");
    }

    onClick() {
        const dashboardManager = DashboardManager.getInstance();
        dashboardManager.setCopied([this.getAssociatedItem()]);
    }
}

export default ButtonCopy;