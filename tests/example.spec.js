// @ts-check
const { test, expect } = require('@playwright/test');
import * as data from "../testData/login.cred.json";
const CryptoJS = require("crypto-js")
const {HomePage} = require('../pages/home.page');
const {LivePage} = require('../pages/live.page')

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.browserstack.com/')
  await expect(page).toHaveTitle(/BrowserStack/);
});

test('Login to BrowserStack', async ({ page }) => {  
  const homePage = new HomePage(page); 
  const livePage = new LivePage(page); 
  await homePage.clickSignIn();
  await homePage.signIn(getDecryptedValue(data.username), getDecryptedValue(data.password));
  await page.waitForTimeout(4000);
  await page.goto('https://live.browserstack.com/dashboard');
  await page.waitForTimeout(3000);  
  await livePage.clickChromeLatest();
  await page.waitForTimeout(7000);
  await livePage.clickGotItButton();  
});

function getDecryptedValue(data) {
  // @ts-ignore
  var decrypted = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

