import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export async function pageFactory<T extends BasePage> ( pageType: new (browserPage: Page) => T, browserPage: Page): Promise<T>
{
    return new pageType(browserPage);
}

