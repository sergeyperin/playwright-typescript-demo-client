import { Page } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * component representing button in DOM
 *
 * @class Button
 */
export class Button extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }
}
