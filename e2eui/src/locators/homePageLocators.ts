export class HomePageLocators {

    static readonly FilterTitle = '.mat-mdc-card-title.mat-h1';
    static readonly BookCard = '.p-1:nth-child(n) > app-book-card';
    static readonly HomePageFirstAddToCartButton = '(//app-home//app-book-card//app-addtocart/button)[1]';
    static readonly BookCardTitle = 'div.card-title.my-2 a strong'; 
    static readonly BookCardPrice = '.mat-mdc-card-content p';
    static readonly BookCategory = 'mat-list-item'
    static readonly SearchBar = 'xpath=//app-nav-bar/mat-toolbar/mat-toolbar-row/div[2]/app-search/form/input'
    static readonly Slider = 'xpath=//app-home/div/div[1]/div/app-price-filter/mat-card/mat-card-content[1]/mat-slider/input[@aria-valuetext="1k"]'
    static readonly SearchResultBar = '//*[@id="mat-option-121"]'
}