# playwright-browserstack
Sample Playwright tests to run on BrowserStack

## Introduction

You can now run your Playwright tests on the BrowserStack infrastructure. Porting your existing Playwright tests to run on BrowserStack, can be done in a matter of minutes.

This guide walks you through running a sample Playwright test on BrowserStack and then goes on to run tests on privately hosted websites and also shows cross-browser tests run in parallel to speed up the build execution.

## Pre-requisites

You need BrowserStack credentials to be able to run Playwright tests. You have to replace `YOUR_USERNAME` and `YOUR_ACCESS_KEY` in the sample scripts in this repository with your BrowserStack credentials which can be found in your [Account Settings](https://www.browserstack.com/accounts/settings) page.

**Alternatively, you can set the environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` with your credentials and all the scripts in this repository should work fine**

## Run Test Playwright test on BrowserStack

1. Clone this repository
2. Install the dependencies using `npm install`
3. Run the `npm run bTest` this will execute the Test in BrowserStack
4. Run the `npm run test` this will execute the Test in local Chrome browser in Headed mode