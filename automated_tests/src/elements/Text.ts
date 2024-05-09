import { Page } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * component representing button in DOM
 *
 * @class Text
 */
export class Text extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }
}
