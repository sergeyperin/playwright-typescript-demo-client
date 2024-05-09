import { Page, expect } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * Component representing table header in DOM
 *
 * @class TableHeader
 */
export class TableHeader extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }

    public async getValues(): Promise<string[]> {
        return (await this.innerText()).split("\n");
    }

    public async assertValuesEqual(expected: string[]): Promise<void> {
        const actual = await this.getValues();
        expect(actual).toEqual(expected);
    }
}
