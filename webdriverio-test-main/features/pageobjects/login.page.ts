import { $ } from '@wdio/globals';
import BasePage from './page';

/**
 * LoginPage handles all interactions with the login page
 * including user credentials input and form submission
 */
class LoginPage extends BasePage {
    private readonly usernameFieldSelector = '#username';
    private readonly passwordFieldSelector = '#password';
    private readonly submitButtonSelector = 'button[type="submit"]';
    private readonly loginPagePath = '/login';

    /**
     * Get username input field element
     */
    public get usernameField() {
        return $(this.usernameFieldSelector);
    }

    /**
     * Get password input field element
     */
    public get passwordField() {
        return $(this.passwordFieldSelector);
    }

    /**
     * Get submit button element
     */
    public get submitButton() {
        return $(this.submitButtonSelector);
    }

    /**
     * Navigate to the login page
     */
    public async navigateToLoginPage(): Promise<void> {
        await this.navigateTo(this.loginPagePath);
    }

    /**
     * Execute login action with provided credentials
     * @param username - The user's username
     * @param password - The user's password
     * @throws Error if login fails
     */
    public async authenticateUser(username: string, password: string): Promise<void> {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        try {
            await this.usernameField.setValue(username);
            await this.passwordField.setValue(password);
            await this.submitButton.click();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Login failed: ${errorMessage}`);
        }
    }
}

export default new LoginPage();
