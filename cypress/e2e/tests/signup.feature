Feature: Signup tests
 
Background:
  Given the user is in the signup page


Scenario Outline: The user creates a new account
    When The user creates a "<accountType>" account
    Then The "<accountType>" account creation "<expected_result>"
    Examples:  
      | accountType  | expected_result |
      | private      | succeeds        |
      | business     | succeeds        |   

Scenario: Check the signin link 
    When The user clicks the sign in button 
    Then They reach the sign in page
  
Scenario: Check the book demo link
    When The user navigates to the business account creation page
    Then The page contains the relevant links
  