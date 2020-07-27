# Summary

This repository contains tests for the following app https://github.com/Postavshik/ngx-cypress-test that was used during the https://www.udemy.com/course/cypress-web-automation-testing-from-zero-to-hero/ Udemy course.

## Setting up and running the app for testing

1. Clone the repository https://github.com/Postavshik/ngx-cypress-test
2. Go to the ngx-cypress-test folder and run the `npm install` command (ignore outdated dependencies)
3. Run the `npm start` command to compile the app and deploy it to the localhost
4. Open `http://localhost:4200` 

### Installing Cypress

1. Install dependencies from the package.json file by running the following command:
```
    $ npm install
```

The info how to install Cypress from the scratch can be found [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#)

## Running tests

When the `ngx-cypress-test` app is already running, in the separate terminal window, run Cypress by using one of the following commands:

Run tests headlessly:

```
    $ npx cypress run
```
or
```
    $ npm run tests
```

For the default Cypress browser - Electron, tests are being recorded when running headlessly.


Run tests via the Test Runner GUI:

```
    $ npm run cypress:open 
```
```
    $ npx cypress open
```

When the Cypress GUI opens, click the test file name to run it (example_spec.js is a default Cypress test file containing 90 tests to show how it works). 
To run a specific test suite only, use the following command: 

```
    $ npx cypress run --spec cypress/integration/app_spec.js

```
More commands can be found [here](https://docs.cypress.io/guides/guides/command-line.html#)

### Check the mochawesome html report

After running tests headlessly with this command:
```
    $ npm run tests
```
the mochawesome HTML report will be automatically generated. You can find the report in the cypress/reports/mochareports folder.

