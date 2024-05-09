import { Page } from "@playwright/test";
import {BaseComponent} from "../BaseComponent";
import {TableHeader} from "./TableHeader";
import {TableContent} from "./TableContent";

/**
 * Component representing fluent ui DetailsList.
 *
 * @class Table
 */
export class Table extends BaseComponent {
    constructor(locator: string, page: Page) {
        super(locator, page);
    }

    public readonly header = new TableHeader("css=div[id='product-list'] table thead", this.page);
    public readonly content = new TableContent("css=div[id='product-list'] table tbody", this.page);

    public getRowCounts(): Promise<number> {
        return this.content.page.locator('tr').count()
    }

    public getColumnCounts(): Promise<number> {
        return this.header.page.locator('tr th').count()
    }

    public getHeaderNames(): Promise<Array<string>> {
        return this.header.page.locator('th').allTextContents();
    }

    public async getValuesByColumn(columnName: string): Promise<Array<string>> {
        // checking values by columns - I have taken this from mine blog https://perinsergeyqa.wordpress.com/2017/11/08/one-useful-tricky-xpath-expression/
        const xpathToFindValuesByColumnName = "xpath=//div[@id='product-list']/table//tbody//td[count(//table//th[text()='" + columnName + "']/preceding-sibling::*) +1]"
        return this.page.locator(xpathToFindValuesByColumnName).allInnerTexts();
    }

}
