import { Page } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * component representing input field in DOM
 *
 * @class InputField
 */
export class InputField extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }

    async typeText(inputText: string): Promise<void> {
        await this.page.fill(this.locator, inputText);
    }
}
