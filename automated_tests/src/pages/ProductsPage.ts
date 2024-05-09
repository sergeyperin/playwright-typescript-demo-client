import { Page } from "@playwright/test";
import {settings} from "../settings";
import {BasePage} from "../BasePage";
import {Button} from "../elements/Button";
import {Table} from "../elements/Table";
import {Text} from "../elements/Text";

/**
 * DashboardPage object
 *
 * @class ProductsPage
 */
export class ProductsPage extends BasePage {
    constructor(page: Page) {
        super(page, settings.baseTestUrl);
    }

    public readonly logoutBtn = new Button("css=button[id='logout-button']", this.browserPage);
    public welcomeMessage = new Text("css=div[class=authenticated-page] h2", this.browserPage)
    public authContentIndicator = new Text("css=div[class=authenticated-page] p", this.browserPage)
    public readonly productsTable = new Table("css=div[id='product-list'] table", this.browserPage);

    public async waitPageToBeReady(): Promise<void> {
        await this.browserPage.waitForSelector(this.logoutBtn.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.productsTable.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.welcomeMessage.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.authContentIndicator.getLocator(), { state: "visible" });
    }

    public async logOutFromApplication(): Promise<void> {
        await this.browserPage.waitForSelector(this.logoutBtn.getLocator(), { state: "visible" });
        await this.logoutBtn.click();
    }

    public async assertProductListExists(): Promise<void> {
        await this.productsTable.assertIsEnabled();
        await this.productsTable.assertIsVisible();
    }

    public async assertProductListNotExists(): Promise<void> {
        await this.productsTable.assertIsHidden();
    }

    public async checkTableLayout(): Promise<void> {
        await this.browserPage.waitForSelector(this.productsTable.header.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.productsTable.content.getLocator(), { state: "visible" });
    }

    public async onNavigatedTo(): Promise<void> {
        await this.browserPage.waitForNavigation();
    }

}
