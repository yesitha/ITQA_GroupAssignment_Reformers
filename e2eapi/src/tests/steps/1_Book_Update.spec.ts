import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { BookUpdate } from '../../requests/BookUpdate';
import { APIRequestContext, request } from 'playwright';
import { expect } from 'playwright/test';
import { RequestHandler } from '../../utils/RequestHandler';
import { UserRole } from '../../data/enum/UserRole';
import { BaseUrl } from '../../data/enum/BaseUrl';
import { EndPoint } from '../../data/enum/EndPoint';
import { ResponseStatusCode } from '../../data/enum/ResponseStatusCode';
import { Book } from '../../models/Book';

setDefaultTimeout(60 * 1000);


let updatedBook: Book = { id: "", title: "Updated Book Title", author: "Updated Author" };


Given('an Admin has created a book', async function () {
 
    const bookCreation = new BookCreation(this.context);
    const book = await bookCreation.validBookCreation(); // Create the book
    this.bookId = book.id;
    console.log(`Book created: ${this.bookId} - ${book.title}`);
});

When('the admin updates the book details', async function () {
    
    const bookUpdate = new BookUpdate(this.context);
    console.log(`Updating book: ${this.bookId} - ${updatedBook.title}`);
    updatedBook.id = this.bookId;
    
    await bookUpdate.AdminauthorizedRequest(updatedBook); 
});

Then('the book should be updated successfully', async function () {
    // Validate the book details
    //ToDo : Replace After implementing the getBookById

    const requestHandler = new RequestHandler(this.context);
    const response = await requestHandler.getRequest(UserRole.ADMIN,EndPoint.GETBOOKBYID,this.bookId);
    console.log(`Response : ${response.json}`);
    expect(response.status).toBe(ResponseStatusCode.OK);
    expect(response.json.title).toBe(updatedBook.title);
    expect(response.json.author).toBe(updatedBook.author);
    console.log(`Book update successful for ${this.bookId}`);
});

When('the user updates the book details', async function () {
 
    const bookUpdate = new BookUpdate(this.context);
    console.log(`Attempting to update book as user: ${this.bookId} - ${updatedBook.title}`);
    updatedBook.id = this.bookId;

    await bookUpdate.UserUnauthorizedRequest(updatedBook);
});

When('the unauthenticated user updates the book details', async function () {

    const bookUpdate = new BookUpdate(this.context);
    console.log(`Attempting to update book as user: ${this.bookId} - ${updatedBook.title}`);
    updatedBook.id = this.bookId;

    await bookUpdate.UnauthenticatedUserUnauthorizedRequest(updatedBook);
});

When('the admin updates the book with an invalid ID', async function () {
    const bookUpdate = new BookUpdate(this.context);
    await bookUpdate.updateBookAdminInvalidId(); 
});

When('the user updates the book with an invalid ID', async function () {
    const bookUpdate = new BookUpdate(this.context);
    await bookUpdate.updateBookUserInvalidId(); 
});


Then('the book should not be updated', async function () {
    // Validate that the book details have not changed

    const requestHandler = new RequestHandler(this.context);
    const response = await requestHandler.getRequest(UserRole.ADMIN, EndPoint.GETBOOKBYID, this.bookId);
    console.log(`Response after unauthorized update attempt: ${response.json}`);
    expect(response.status).toBe(ResponseStatusCode.OK); // Ensure the book is still accessible
    expect(response.json.title).not.toBe(updatedBook.title); // Title should not have been updated
    expect(response.json.author).not.toBe(updatedBook.author); // Author should not have been updated
    console.log(`Unauthorized book update was correctly prevented for ${this.bookId}`);
});

// Anudhi's

When('the admin sends the update request with missing ID', async function () {
     const bookUpdate = new BookUpdate(this.context);
     console.log('Admin attempting to update book with missing ID');
    await bookUpdate.updateBookAdminMissingId(updatedBook);
});

Then('the admin should see a 405 Method Not Allowed error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.METHOD_NOT_ALLOWED);
    console.log('Received expected error: Method Not Allowed');
});

When('the admin sends the update request with missing title', async function () {
    const bookUpdate = new BookUpdate(this.context);
    console.log('Admin attempting to update book with missing title');
    await bookUpdate.updateBookAdminMissingTitle(updatedBook);
});

Then('the admin should see a 400 Bad Request error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.BAD_REQUEST);
    console.log('Received expected error: Bad Request');
});

When('the admin sends the update request with missing author', async function () {
    const bookUpdate = new BookUpdate(this.context);
    console.log('Admin attempting to update book with missing author');
    await bookUpdate.updateBookAdminMissingAuthor(updatedBook);
});

When('the user sends the update request with missing ID', async function () {
    const bookUpdate = new BookUpdate(this.context);
    console.log('User attempting to update book with missing ID');
    await bookUpdate.updateBookUserMissingId(updatedBook);

});

Then('the user should see a 405 Method Not Allowed error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.METHOD_NOT_ALLOWED);
    console.log('Received expected error: Method Not Allowed');
});

When('the user sends the update request with missing title', async function () {
    const bookUpdate = new BookUpdate(this.context);
    console.log('User attempting to update book with missing title');
    await bookUpdate.updateBookUserMissingTitle(updatedBook);
});

Then('the user should see a 403 Forbidden error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.FORBIDDEN);
    console.log('Received expected error: Forbidden');
});

When('the user sends the update request with missing author', async function () {
    const bookUpdate = new BookUpdate(this.context);
    console.log('User attempting to update book with missing author');
    await bookUpdate.updateBookUserMissingAuthor(updatedBook);
});

Then('the user should see a 400 Forbidden error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.BAD_REQUEST);
    console.log('Received expected error: Bad Request');
});







