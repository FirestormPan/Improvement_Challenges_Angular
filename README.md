# ImprovementDares

## Functionalities

### Log in/sign up
Click on  __log in__ or __sign up__ to toggle the relevant popup. Creating a user adds the username and a hashed password to the database.

### Changing profile picture
Users have a profile picture(no other info, for simplicity). They can upoad a new one by uploading a file from their system. 

### Creating a contract
Use the form in "Contracts" page. Adding a participant fetches the users from the datase whose name includes your input. The generated contract is added to the database, and is linked to its participants. Users see the contracts in which they are included in that page.

### Completing a contract
Completing a contract creates a new card in the database with input derriving from the contract. The challenge in the card is of level/color as the contract. The owner of the card is the user who completed it. In case the contract was "random" difficulty, it is randomly selected for the card. The contract is deleted from the database. 

### Cards
A card has a challenge. The owner of the card can activate the card "on" a participant of the contract which created the card. Completing the card is only possible when a target is selected and it  removes it from the database

### Truth or dare?
Click on the dedicated button to get a random truth or dare from an API.

## How to install-set up in development server
1) Create the database with the `databaseCreation.sql` script. Make sure to put your db credentials in the endpoints/.env file.
2) Run `node app.js` in the `enpoints` folder. Express server runs on port `3005`
3) Run `ng serve` in the parent folder, for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
