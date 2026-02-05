Feature: SauceDemo Application - Login Authentication

  Background:
    Given user is on login page

  Scenario Outline: Verify login functionality with different user accounts
    When user enters <username> and <password>
    And user clicks on login button
    Then this <message> should be displayed

    Examples:
      | username             | password     | message                                                     |
      | standard_user        | secret_sauce | You logged into a secure area!                              |
      | locked_out_user      | secret_sauce | Username and password do not match any user in this service |
      | problem_user         | secret_sauce | You logged into a secure area!                              |
