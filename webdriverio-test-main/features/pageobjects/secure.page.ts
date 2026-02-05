import { $ } from '@wdio/globals';
import BasePage from './page';

/**
 * SecurePage handles post-login page interactions and validations
 * including verification of success/error messages
 */
class SecurePage extends BasePage {
    private readonly alertMessageSelector = '#flash';
    private readonly securePagePath = '/secure';

    /**
     * Get alert/notification element
     */
    public get alertMessage() {
        return $(this.alertMessageSelector);
    }

    /**
     * Navigate to the secure page
     */
    public async navigateToSecurePage(): Promise<void> {
        await this.navigateTo(this.securePagePath);
    }

    /**
     * Verify if alert message is displayed
     * @returns True if alert is visible, false otherwise
     */
    public async isAlertDisplayed(): Promise<boolean> {
        try {
            return await this.alertMessage.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the text content of the alert message
     * @returns The alert message text
     */
    public async getAlertText(): Promise<string> {
        return await this.alertMessage.getText();
    }
}

export default new SecurePage();
