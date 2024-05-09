import { Page} from "@playwright/test";

/**
 * The {@link BasePage} class.
 */
export abstract class BasePage {
    protected browserPage: Page;
    protected baseTestUrl: string;

    protected constructor(page: Page, baseTestUrl: string) {
        this.browserPage = page;
        this.baseTestUrl = baseTestUrl;
    }

    public async navigateToPage(endpoint = ""): Promise<void> {
        await this.browserPage.goto(this.baseTestUrl + endpoint);
        await this.onNavigatedTo();
    }

    public async goToPage(endpoint = ""): Promise<void> {
        await this.waitForNavigatedTo(async () => {
            await this.browserPage.goto(this.baseTestUrl + endpoint);
        });
    }

    public async waitForNavigatedTo(action: () => Promise<void>): Promise<void> {
        const wait = this.onNavigatedTo();
        await action();
        await wait;
    }

    protected async onNavigatedTo(): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

}
