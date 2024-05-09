import { Page } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * component representing checkbox in DOM
 *
 * @class Checkbox
 */
export class Checkbox extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }
}
