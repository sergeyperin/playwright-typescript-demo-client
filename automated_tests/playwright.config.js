const { resolve } = require("path");
const fs = require("fs");
const { compilerOptions } = require("./tsconfig");
const { config, parse } = require("dotenv");

// load and store .env file on process.env
const result = config();
const values = result.parsed ?? {};


const moduleNameMapper = {};
Object.keys(compilerOptions.paths).forEach((keyPath) => {
    const realPath = compilerOptions.paths[keyPath][0];
    moduleNameMapper[`^${keyPath}$`] = resolve(__dirname, `./src/${realPath}`);
});

module.exports = {
    moduleNameMapper: moduleNameMapper,
    moduleFileExtensions: ["ts", "js"],
    reporter: [["list"], ["junit", { outputFile: "test-results/junit-tests.xml" }]],
    name: "Chromium",
    timeout: 45000,
    use: {
        browserName: "chromium",
        headless: false,
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        devtools: true,
        testDir: "src",
    },
};
