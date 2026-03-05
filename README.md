r# Silly Contracts

## Functionality
Place bets with your friends and keep track of them as contracts. When a contract is completed, a challenge card is generated that the winner can use on other users

### Log in/sign up
Click on  __log in__ or __sign up__ to toggle the relevant popup. Creating a user adds the username and a **hashed** password to the database.

### Changing profile picture
Users have a profile picture. They can upload a new one by uploading a file from their system. 

### Creating a contract
Use the form in "Contracts" page. When adding a contract participant, the website fetches from the database the users whose names include your input.
The generated contract is added to the database. Its fields are the submitted form's inputs. It is linked to its participants, with a table that matches user_id with contract_id.
Users see the contracts in which they are included/matched in the Contracts page.

### Completing a contract
Completing a contract creates a new card in the database with information deriving from the contract, as a reward to the completing user. Each card has a challenge with the difficulty level of the contract. The owner(db user) of the card is simply the one who user who marks the contract as completed. The contract is then deleted from the database. 

### Cards
A card has a challenge and a list of people on whom the owner of the card can "cast" it. Completing the card is only possible when a target-user is selected. The card is removed from the database

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
