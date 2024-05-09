import { test } from "@playwright/test";
import {LogInPage} from "../pages/LogInPage";
import {pageFactory} from "../pageFactory";
import {ProductsPage} from "../pages/ProductsPage";

test.describe("Log in tests:", () => {
    let logInPage: LogInPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        logInPage = await pageFactory(LogInPage, page);
        productsPage = await pageFactory(ProductsPage, page);
    });

    test("when user credentials are filled and submitted then user is logged in and products page is displayed", async () => {
        await logInPage.navigateToPage();
        await logInPage.waitPageToBeReady();
        await logInPage.setLoginForm();
        await logInPage.submitLogin();
        await productsPage.waitPageToBeReady();
        await productsPage.assertProductListExists()
    });
});