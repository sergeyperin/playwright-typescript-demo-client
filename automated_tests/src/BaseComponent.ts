import { Page, expect } from "@playwright/test";
import { isNil } from "lodash";

/**
 * base component for simplifying working with custom components
 *
 * @class BaseComponent
 */
export abstract class BaseComponent {
    get page(): Page {
        return this._page;
    }
    protected readonly locator: string;
    private readonly _page: Page;

    constructor(locator: string, page: Page) {
        this.locator = locator;
        this._page = page;
    }
    /**
     * Click method
     *
     * @param {number} timeout The timeout.
     */
    async click(timeout = 10000): Promise<void> {
        await this._page.click(this.locator, { timeout });
    }

    getLocator(): string {
        return this.locator;
    }

    async hover(): Promise<void> {
        await this._page.hover(this.locator);
    }

    async textContent(): Promise<string | null> {
        return await this._page.textContent(this.locator);
    }

    async innerText(): Promise<string> {
        return await this._page.innerText(this.locator);
    }

    async isDisabled(): Promise<boolean> {
        return await this._page.isDisabled(this.locator);
    }

    async isEnabled(): Promise<boolean> {
        return await this._page.isEnabled(this.locator);
    }

    async isVisible(): Promise<boolean> {
        return await this._page.isVisible(this.locator);
    }

    async isHidden(): Promise<boolean> {
        return await this._page.isHidden(this.locator);
    }

    async getAttribute(attributeName: string): Promise<string | null> {
        const element = await this._page.$(this.locator);

        if (isNil(element)) {
            return null;
        }

        return element.getAttribute(attributeName);
    }

    async waitForText(text: string, options?: { timeout?: number }): Promise<void> {
        await this._page.waitForSelector(`${this.locator} >> text='${text}'`, options);
    }

    async waitForElement(state: "hidden" | "visible" = "visible"): Promise<void> {
        await this._page.waitForSelector(this.locator, { state });
    }

    async assertTextEquals(expectedTextValue: string): Promise<void> {
        const actualTextValue = await this.textContent();
        expect(actualTextValue).toEqual(expectedTextValue);
    }

    async assertIsEnabled(): Promise<void> {
        const enabled = await this.isEnabled();
        expect(enabled).toEqual(true);
    }

    async assertIsDisabled(): Promise<void> {
        const enabled = await this.isEnabled();
        expect(enabled).toEqual(false);
    }

    async assertIsVisible(): Promise<void> {
        const isComponentVisible = await this.isVisible();
        expect(isComponentVisible).toEqual(true);
    }

    async assertIsHidden(): Promise<void> {
        const isComponentHidden = await this.isHidden();
        expect(isComponentHidden).toEqual(true);
    }

    async scrollIntoView(): Promise<void> {
        const element = await this._page.$(this.locator);
        if (element === null) {
            return;
        }
        await element.scrollIntoViewIfNeeded();
        await this.waitForElement("visible");
    }
}
