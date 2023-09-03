import Button from "../Button.js";
import DashboardState from "../DashboardState.js";

class ButtonCopy extends Button {
    constructor() {
        super("content_copy");
    }

    onClick() {
        const dashboardState = DashboardState.getInstance();
        dashboardState.setCopied([this.getAssociatedItem()]);
    }
}

export default ButtonCopy;