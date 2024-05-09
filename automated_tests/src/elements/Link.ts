import { Page } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * component representing link in DOM
 *
 * @class Link
 */
export class Link extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }
}
