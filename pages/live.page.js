const { expect } = require('@playwright/test');

exports.LivePage = class LivePage {
    constructor(page) {
      this.page = page;
      this.goButton = page.getByRole('button', { name: 'Got it' });
      this.gotItbutton = page.locator('#vertical-toolbar-spotlight').getByRole('button', { name: 'Got it' })
      this.chromeLatest = page.getByText('112 latest').first();
      this.urlField = page.getByRole('textbox', { name: 'Type URL' });
      this.startTestButton = page.getByRole('button', { name: 'Start test' });
      this.stopSession = page.getByText('Stop Session');
      this.accountLogo = page.getByRole('button', { name: 'Account', exact: true });
    }
  
    async clickChromeLatest(){
      await this.chromeLatest.click()
    }

    async clickGotItButton() {      
      await this.gotItbutton.click()      
      await this.goButton.click();
    }

    async clickStopSession(){
      await this.stopSession.click();
    }

    async verifyAccountLogoDisplayed(){
      await expect(this.accountLogo).toBeVisible();
    }
  }