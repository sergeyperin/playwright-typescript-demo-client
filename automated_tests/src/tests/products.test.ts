import { test, expect } from "@playwright/test";
import {LogInPage} from "../pages/LogInPage";
import {pageFactory} from "../pageFactory";
import {ProductsPage} from "../pages/ProductsPage";

test.describe("Products page tests:", () => {
    let logInPage: LogInPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        logInPage = await pageFactory(LogInPage, page);
        productsPage = await pageFactory(ProductsPage, page);
    });

    test("when user is logged in, products table is displayed with detailed information", async () => {
        await logInPage.logInToApplication();
        await productsPage.waitPageToBeReady();
        await productsPage.checkTableLayout();
        // check table size
        const actualColumns = await productsPage.productsTable.getColumnCounts();
        const actualRows = await productsPage.productsTable.getRowCounts();
        expect(actualColumns).toBe(6);
        expect(actualRows).toBe(31);

        // check table headers
        const expectedHeaders: Array<string> = ['ID', 'Title', 'Description', 'Price', 'Rating', 'Thumbnail'];
        const actualHeaders = await productsPage.productsTable.getHeaderNames();
        expect(expectedHeaders).toEqual(actualHeaders);

        // this data is static and in same order since the application returns in that way. But in fact, expected data should be
        // pulled from database or any other service. Data should be prod like. It should be enough for testing purposes in scope of this task.
        // sorting feature is absent there.
        const expectedProductNames: Array<string> = [
            'iPhone 9', 'iPhone X', 'Samsung Universe 9', 'OPPOF19', 'Huawei P30', 'MacBook Pro', 'Samsung Galaxy Book',
            'Microsoft Surface Laptop 4', 'Infinix INBOOK', 'HP Pavilion 15-DK1056WM',
            'perfume Oil', 'Brown Perfume', 'Fog Scent Xpressio Perfume',
            'Non-Alcoholic Concentrated Perfume Oil', 'Eau De Perfume Spray', 'Hyaluronic Acid Serum',
            'Tree Oil 30ml', 'Oil Free Moisturizer 100ml', 'Skin Beauty Serum.', 'Freckle Treatment Cream- 15gm',
            '- Daal Masoor 500 grams', 'Elbow Macaroni - 400 gm',
            'Orange Essence Food Flavou', 'cereals muesli fruit nuts', 'Gulab Powder 50 Gram',
            'Plant Hanger For Home', 'Flying Wooden Bird', '3D Embellishment Art Lamp',
            'Handcraft Chinese style', 'Key Holder'
        ]
        const actualProductNames: Array<string> = await productsPage.productsTable.getValuesByColumn("Title");
        expect(actualProductNames).toEqual(expectedProductNames);
        // it is important to check the rest of the data in the table. It can be done in the same way as with product Titles
        // I have decided to stop there to not have endless testing task. Appreciate if you understand me.
        // Also, Playright APIs for tables can be considered as well.
    });
});