import Button from "../Button.js";
import DashboardState from "../DashboardState.js";

class ButtonCut extends Button {
    constructor() {
        super("content_cut");
    }

    onClick() {
        const item = this.getAssociatedItem();
        const dashboardState = DashboardState.getInstance();
        dashboardState.cancelCopy();
        dashboardState.cancelCut();
        dashboardState.setCut([item]);
    }
}

export default ButtonCut;