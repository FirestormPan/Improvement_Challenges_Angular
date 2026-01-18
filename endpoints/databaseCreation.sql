CREATE DATABASE IF NOT EXISTS improvementdares;
USE improvementdares;

-- Users table
CREATE TABLE IF NOT EXISTS users (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	username varchar(255),
	hashed_password varchar(255),
	pfp varchar(255) DEFAULT 'https://www.w3schools.com/images/w3schools_green.jpg',
	email varchar(255)
);

-- Sample users
INSERT INTO users (id, username, hashed_password, pfp, email) VALUES
(1, 'pantelos', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'pantelos@example.com'),
(2, 'maria', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'maria@example.com'),
(3, 'slavanderos', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'slavanderos@example.com'),
(7, 'Pantelis', '$2b$05$ZdU2CxnOiMKXv7yXjj2BRObaBXOIFD3KsHugR9VQDKR5FUV8zzafK', 'https://www.w3schools.com/images/w3schools_green.jpg', 'pantelis@example.com'),
(103, 'Aurorra', '$2b$05$ZdU2CxnOiMKXv7yXjj2BRObaBXOIFD3KsHugR9VQDKR5FUV8zzafK', 'https://www.w3schools.com/images/w3schools_green.jpg', 'aurorra@example.com'),
(513, 'Kosmas', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'kosmas@example.com'),
(105, 'Ioanna', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'ioanna@example.com'),
(123, 'Maria', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'maria2@example.com'),
(100, 'Kwstas', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'kwstas@example.com'),
(999, 'Dimitris', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'dimitris@example.com'),
(309, 'Sindler', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'sindler@example.com'),
(807, 'Zerg', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'zerg@example.com'),
(582, 'Spaghetti', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'spaghetti@example.com'),
(580, 'Spari', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'spari@example.com'),
(581, 'Sparilillililili', 'Default', 'https://www.w3schools.com/images/w3schools_green.jpg', 'sparilillililili@example.com'),
(1000, 'lego', '$2b$05$ZdU2CxnOiMKXv7yXjj2BRObaBXOIFD3KsHugR9VQDKR5FUV8zzafK', 'https://www.w3schools.com/images/w3schools_green.jpg', 'pantelos1999@gmail.com');

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	title varchar(100),
	description varchar(255),
	color varchar(50),
	dueDate datetime
);

INSERT INTO contracts (id, title, description, color) VALUES
(1, 'contract 1', 'initial contract', 'green'),
(2, 'contract 2', 'dos contract', 'yellow'),
(3, 'contract 3', 'tres contract', 'red'),
(4, 'contract 4', 'quatro contract', 'random');

-- User_contracts pivot table
CREATE TABLE IF NOT EXISTS user_contracts (
	user_id INT NOT NULL,
	contract_id INT NOT NULL,
	PRIMARY KEY (user_id, contract_id),
	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_contract
		FOREIGN KEY (contract_id)
		REFERENCES contracts(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

INSERT INTO user_contracts (user_id, contract_id) VALUES
(1000, 1),
(2, 1),
(1000,2),
(2,2);


-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	description varchar(255),
	color varchar(50)
);

INSERT INTO challenges (id, description, color) VALUES
(1, 'a green challenge', 'green'),
(2, 'a red challenge', 'red'),
(3, 'a yellow challenge', 'yellow'),
(4, 'Πεσε 10 καμψεις', 'red'),
(5, 'Dance an oriental belly dance for 2 mins', 'red'),
(6, 'Become the winner''s(or a random group member''s) bard for 15mins. You have to sing/narrate their actions in a heroic way.', 'red'),
(7, 'Sing Afrika by Shakira song', 'yellow'),
(8, 'Do a funny catwalk across the room', 'yellow'),
(9, 'Do an impression of a famous person until someone guesses who you are', 'yellow');

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	title varchar(255),
	text varchar(255),
    type varchar(255),
	challenge_id int,
	owner_id int
);

INSERT INTO cards (title, text, type, challenge_id, owner_id) VALUES
('Card Alpha', 'This is the first card', "activatable", 1, 1000),
('Card Beta', 'Second card description', "activatable", 2, 2),
('Card Gamma', 'Third card example', "activatable", 3, 1000),
('Card Delta', 'Fourth card info', "activatable", 1,  1000),
('Card Epsilon', 'Fifth card data', "activatable", 4, 1000);

-- Card_users table
CREATE TABLE IF NOT EXISTS card_users (
	card_id int,
	user_id int,
	PRIMARY KEY (card_id, user_id)
);

INSERT INTO card_users (card_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 7),
(3,1000),
(3,2),
(3,3),
(4, 100);