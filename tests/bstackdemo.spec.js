const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const CryptoJS = require("crypto-js")
const { HomePage } = require('../pages/home.page');
const { LivePage } = require('../pages/live.page')

const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const caps = {
    'browser': 'chrome',
    'os': 'osx',
    'os_version': 'catalina',
    'name': 'Playwright Test Execution',
    'build': 'playwright-build-1',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
    'client.playwrightVersion': clientPlaywrightVersion  // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
  };
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
  });
  const page = await browser.newPage();
  await console.log("Test Started")
  await page.goto('https://www.browserstack.com/');
  await console.log("Navigate to BrowserStack")
  // Verify Title of the Page
  try {
    await expect(page).toHaveTitle(/BrowserStack/);
    await console.log("Verify Page Title")
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Title matched' } })}`);
  } catch {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Title did not match' } })}`);
  }
  await expect(page).toHaveTitle(/BrowserStack/);
  const homePage = new HomePage(page);
  const livePage = new LivePage(page);
  await homePage.clickSignIn();
  await console.log("Click Sign IN")
  // Verify Sign In Logo Displayed
  try {
    await homePage.verifySignInHeaderDisplayed();
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Sign In Logo Displayed' } })}`);
  } catch {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Sign In Logo Not displayed' } })}`);
  }
  // Sign In to BrowserStack Account
  await homePage.signIn(getDecryptedValue('U2FsdGVkX1/zo0ui5ySeWcHvQ5HdM6GTc/T7t5WDvmpAGlV5jlopupp8uX4WZ+i4'), getDecryptedValue('U2FsdGVkX1+px/qhFhVGmsqkuQXS+2S/QBhvU9Ij8c8='));
  await page.waitForTimeout(5000);
  // Verify Sign In
  try {
    await livePage.verifyAccountLogoDisplayed();
    await console.log("Logged In Successfully");
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Account Logo Displayed' } })}`);
  } catch {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Account Logo is Not displayed' } })}`);
  }
  await page.goto('https://live.browserstack.com/dashboard');
  await page.waitForTimeout(3000);
  // Select Chrome Latest 
  await livePage.clickChromeLatest();
  await console.log("Selected Latest Chrome Browser")
  await page.waitForTimeout(7000);
  await livePage.clickGotItButton();
  await livePage.clickStopSession();
  await console.log("Click on Stop Session")
  // Verify Session Stopped
  await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Session Stopped' } })}`);
  // Close browser
  await browser.close();
  await console.log("Browser Closed")
})();

function getDecryptedValue(data) {
  // @ts-ignore
  var decrypted = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

async function stepDetails() {
  try {
    await expect(page).toHaveTitle(/BrowserStack/);
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Title matched' } })}`);
  } catch {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Title did not match' } })}`);
  }
}
