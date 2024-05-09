import { test } from "@playwright/test";
import {LogInPage} from "../pages/LogInPage";
import {pageFactory} from "../pageFactory";
import {ProductsPage} from "../pages/ProductsPage";

test.describe("Log out tests:", () => {
    let logInPage: LogInPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        logInPage = await pageFactory(LogInPage, page);
        productsPage = await pageFactory(ProductsPage, page);
    });

    test("when user press log out then user is logged out and products page is not displayed, log in is displayed", async () => {
        await logInPage.logInToApplication();
        await productsPage.logOutFromApplication();
        await logInPage.waitPageToBeReady();
        await productsPage.assertProductListNotExists();
    });
});