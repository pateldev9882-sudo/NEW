import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect, $ } from '@wdio/globals';

const CONFIG = {
    demoLoginUrl: 'https://www.saucedemo.com/',
    usernameSelector: '#user-name',
    passwordSelector: '#password',
    loginButtonSelector: '#login-button',
    loginContainerSelector: '#login_button_container',
    pageTitle: '.title',
    inventoryPath: 'inventory',
    navigationTimeout: 5000,
    expectedTitle: 'Products'
};

/**
 * Given: User navigates to the demo login page
 */
Given(/^user is on login page$/, async () => {
    await browser.url(CONFIG.demoLoginUrl);
    // Wait for the login form to be visible instead of relying on page title
    const usernameField = await $(CONFIG.usernameSelector);
    await usernameField.waitForDisplayed({ timeout: CONFIG.navigationTimeout });
});

/**
 * When: User enters credentials
 */
When(/^user enters (.*) and (.*)$/, async (username: string, password: string) => {
    const usernameField = await $(CONFIG.usernameSelector);
    const passwordField = await $(CONFIG.passwordSelector);

    await usernameField.waitForDisplayed({ timeout: CONFIG.navigationTimeout });
    await usernameField.setValue(username);
    await passwordField.setValue(password);
});

/**
 * When: User submits login form
 */
When(/^user clicks on login button$/, async () => {
    const loginButton = await $(CONFIG.loginButtonSelector);
    await loginButton.click();
});

/**
 * Then: Verify login result message
 */
Then(/^this (.*) should be displayed$/, async (expectedMessage: string) => {
    // Wait for page to stabilize after login attempt
    await browser.waitUntil(async () => {
        const currentUrl = await browser.getUrl();
        const loginContainerVisible = await $(CONFIG.loginContainerSelector).isDisplayed().catch(() => false);
        return currentUrl.includes(CONFIG.inventoryPath) || loginContainerVisible;
    }, { timeout: CONFIG.navigationTimeout });

    // Validate success or failure scenario
    const isSuccessScenario = expectedMessage.includes('logged into');
    
    if (isSuccessScenario) {
        const pageTitle = await $(CONFIG.pageTitle);
        await expect(pageTitle).toHaveText(CONFIG.expectedTitle);
    } else {
        const loginContainer = await $(CONFIG.loginContainerSelector);
        await expect(loginContainer).toBeDisplayed();
    }
});
