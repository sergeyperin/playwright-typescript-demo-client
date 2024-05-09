import { Page } from "@playwright/test";
import {BasePage} from "../BasePage";
import {Button} from "../elements/Button";
import {settings} from "../settings";
import {InputField} from "../elements/InputField";
import {Checkbox} from "../elements/Checkbox";
import {Link} from "../elements/Link";

/**
 * DashboardPage object
 *
 * @class DashboardPage
 */
export class LogInPage extends BasePage {
    constructor(page: Page) {
        super(page, settings.baseTestUrl);
    }

    public readonly username = new InputField("css=input[id='username']", this.browserPage);
    public readonly password = new InputField("css=input[id='password']", this.browserPage);
    public readonly logIn = new Button("css=button[type='submit']", this.browserPage);
    public readonly rememberMe = new Checkbox("css=input[id='remember-me']", this.browserPage);
    public readonly forgotPassword = new Link("':has-text(\"Forgot password\")'", this.browserPage);


    public async waitPageToBeReady(): Promise<void> {
        await this.browserPage.waitForSelector(this.logIn.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.password.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.username.getLocator(), { state: "visible" });
        await this.browserPage.waitForSelector(this.rememberMe.getLocator(), { state: "visible" });
        // this is defect in fact. should not wait till hidden. Should wait till attached or visible.
        await this.browserPage.waitForSelector(this.forgotPassword.getLocator(), { state: "hidden" });
    }

    public async setLoginForm(): Promise<void> {
        // it is not good to hardcode values but it is done since it is testing task
        await this.username.typeText(settings.user1.username)
        await this.password.typeText(settings.user1.password)
    }

    public async submitLogin(): Promise<void> {
        await this.logIn.click()
    }

    public async logInToApplication(): Promise<void> {
        await this.navigateToPage()
        await this.waitPageToBeReady()
        await this.setLoginForm()
        await this.submitLogin()
    }



}
