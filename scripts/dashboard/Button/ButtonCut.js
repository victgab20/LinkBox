import Button from "../Button.js";
import DashboardState from "../DashboardState.js";

class ButtonCut extends Button {
    constructor() {
        super("content_cut");
    }

    onClick() {
        const dashboardState = new DashboardState();
        dashboardState.setCut([this.getAssociatedItem()]);
    }
}

export default ButtonCut;