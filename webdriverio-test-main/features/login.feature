Feature: The Internet Guinea Pig Website - Login Feature

  Background:
    Given I am on the login page

  Scenario Outline: User authentication with various credentials
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |
      | foobar   | barfoo               | Your username is invalid!      |
      | user123  | pass456              | Your username is invalid!      |
