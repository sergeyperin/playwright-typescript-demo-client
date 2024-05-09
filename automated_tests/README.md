# Introduction

These are 3 scenarios for tui testing challenge. Written using Playwright and Type Script using Mac Book.

# Mandatory steps before run

Make sure your AUT is up and running.
Application under test is inside qa-code-challenge folder. You need to be inside this folder.
You should first clone the repository on your local machine and install the dependencies:

```
$ npm i
```

Then you should be able to start the application:

```
$ npm run dev
```
Application should be running and you should be able to load it using your browser pointing to http://localhost:3000.


# Run tests
Ensure you have up to dated browser including Chromium.
To install Chromium, please execute next command in the terminal
```
npx playwright install
```
Go inside ./automated_tests folder and execute next commands to install repo with tests:

```
$ npm i
```

To run all 3 tests:

```
npx playwright test

```

# Supported env

Tests are written to be supported on Chromium. It is limited since it is testing task.



