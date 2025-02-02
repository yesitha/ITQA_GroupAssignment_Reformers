Feature: Homepage functionality
As a unauthenticated user
I want to test homepage functionality
So that I can filter price, search books and choose product category

  @UI-TC-20
  Scenario: Select Category
    Given Navigate to the homepage
    When the user change the product category
    Then the list of books displayed should be updated according to the selected category

  @UI-TC-21
  Scenario: Search a book from the search bar
    When the user enter the name of a book on the search bar and select it
    Then the relevant book should be displayed

  @UI-TC-22
  Scenario: Price filter
    When the user change the price from the price filter
    Then the list of books displayed should be updated according to the selected price
