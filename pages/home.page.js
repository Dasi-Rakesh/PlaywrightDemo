const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
    constructor(page) {
      this.page = page;
      this.signInButton = page.getByRole('link', { name: 'Sign in' });
      this.emailField = page.getByRole('textbox', { name: 'Business Email' });
      this.passwordField = page.getByPlaceholder('Password');
      this.loginButton = page.getByRole('button', { name: 'Sign me in' });
      this.signInLogo = page.getByRole('heading', { name: 'Sign in' });
    }
   
    async signIn(email, password) {
      await this.emailField.fill(email)
      await this.passwordField.fill(password)
      await this.loginButton.click()
    }
  
  
    async enterPassword(password) {
      await this.passwordField.fill(password)
    }
  
    async verifySignInHeaderDisplayed(){
      await expect(this.signInLogo).toBeVisible();
    }
  
    async clickSignIn() {
      await this.signInButton.click()
    }
  }