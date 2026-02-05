import { browser } from '@wdio/globals';

/**
 * BasePage class containing all methods, selectors and functionality
 * that is shared across all page object implementations
 */
export default class BasePage {
    protected readonly baseUrl: string = 'https://the-internet.herokuapp.com';

    /**
     * Navigate to a specific path on the application
     * @param path - The relative path to navigate to (e.g. /login, /admin)
     * @returns Promise that resolves when navigation is complete
     */
    public async navigateTo(path: string): Promise<void> {
        const fullUrl = `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        await browser.url(fullUrl);
    }

    /**
     * Wait for element to be present in DOM
     * @param selector - CSS selector of the element
     * @param timeout - Maximum wait time in milliseconds
     */
    public async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
    }
}
