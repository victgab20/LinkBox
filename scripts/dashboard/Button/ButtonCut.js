import Button from "../Button.js";
import DashboardManager from "../DashboardManager.js";

class ButtonCut extends Button {
    constructor() {
        super("content_cut");
    }

    onClick() {
        const item = this.getAssociatedItem();
        const dashboardManager = DashboardManager.getInstance();
        dashboardManager.cancelCopy();
        dashboardManager.cancelCut();
        dashboardManager.setCut([item]);
    }
}

export default ButtonCut;