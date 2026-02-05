import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';

/**
 * Page registry mapping for step definitions
 */
const pageRegistry: { [key: string]: any } = {
    login: LoginPage,
    secure: SecurePage
};

/**
 * Given: User navigates to specified page
 */
Given(/^I am on the (\w+) page$/, async (pageName: string) => {
    const page = pageRegistry[pageName];
    if (!page) {
        throw new Error(`Page '${pageName}' not found in registry`);
    }
    if (pageName === 'login') {
        await LoginPage.navigateToLoginPage();
    } else if (pageName === 'secure') {
        await SecurePage.navigateToSecurePage();
    }
});

/**
 * When: User enters credentials and logs in
 */
When(/^I login with (\w+) and (.+)$/, async (username: string, password: string) => {
    await LoginPage.authenticateUser(username, password);
});

/**
 * Then: Verify flash message contains expected text
 */
Then(/^I should see a flash message saying (.*)$/, async (expectedMessage: string) => {
    const isDisplayed = await SecurePage.isAlertDisplayed();
    expect(isDisplayed).toBe(true);

    const actualMessage = await SecurePage.getAlertText();
    expect(actualMessage).toContain(expectedMessage);
});

