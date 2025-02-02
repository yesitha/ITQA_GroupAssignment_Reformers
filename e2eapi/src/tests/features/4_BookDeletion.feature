@deletion
Feature: Book deletion functionality

  As an admin or user
  I want to test book deletion functionality
  So that I can validate the API behavior for different roles and scenarios

  @API-TC-31
  @yesitha
  Scenario: Admin successfully deletes a valid book
    Given an admin has created a book
    When the admin deletes the same book
    Then the book should be deleted successfully

  @API-TC-32
  @yesitha
  Scenario: Admin attempts to delete a book with missing ID
    When the admin sends the delete request with missing ID
    #Then the admin should see a 400 Bad Request error

  @API-TC-33
  @yesitha
  Scenario: Admin attempts to delete a book with an invalid ID
    When the admin deletes the book with an invalid ID
    #Then the admin should see a 404 Not Found error

  @API-TC-34
  @yesitha
  Scenario: User attempts to delete a book with valid details
    Given an admin has created a book
    When the user tries to delete the same book
    #Then the user should see a 403 Forbidden error

  @API-TC-35
  @yesitha
  Scenario: User attempts to delete a book with missing ID
    When the user sends the delete request with missing ID
    #Then the user should see a 403 Forbidden error

  @API-TC-36
  @yesitha
  Scenario: User attempts to delete a book with an invalid ID
    When the user tries to delete the book with an invalid ID
    #Then the user should see a 403 Forbidden error

  @API-TC-37
  @yesitha
  Scenario: Unauthenticated user attempts to delete a book
    Given an admin has created a book
    When the unauthenticated user tries to delete same the book
     #Then the user should see a 401 Unauthorized error
    
    
