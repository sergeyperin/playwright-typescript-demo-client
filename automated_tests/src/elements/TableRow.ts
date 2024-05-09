import { Page, expect } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";
/**
 * Component representing table row in DOM
 *
 * @class TableRow
 */
export class TableRow extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }

    public async isSelected(): Promise<boolean> {
        const attribute = await this.getAttribute("aria-selected");
        return attribute === "true";
    }

    public async assertIsSelected(expectTrue = true): Promise<void> {
        const selected = await this.isSelected();
        expect(selected).toEqual(expectTrue);
    }

    public async getValues(): Promise<string[]> {
        return (await this.innerText()).split("\n");
    }

    public async assertValuesEqual(expected: string[]): Promise<void> {
        const actual = await this.getValues();
        expect(actual).toEqual(expected);
    }
}
