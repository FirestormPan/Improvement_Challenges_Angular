CREATE DATABASE IF NOT EXISTS improvement_dares;
USE improvement_dares;

CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255),
    profile_picture varchar(255) DEFAULT "https://www.w3schools.com/images/w3schools_green.jpg"
);

INSERT INTO users (id, username, profile_picture) VALUES
    ("1", 'pantelos', 'Default'),
    ("2", 'maria', 'Default'),
    ("3", 'slavanderos', 'Default'),
    ("4", 'anika', 'Default'),
    ("7", 'Pantelis', 'https://picsum.photos/200'),
    ("103", 'Aurorra', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("513", 'Kosmas', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("105", 'Ioanna', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("123", 'Maria', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("100", 'Kwstas', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("999", 'Dimitris', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("309", 'Sindler', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("807", 'Zerg', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("582", 'Spaghetti', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("580", 'Spari', 'https://www.w3schools.com/images/w3schools_green.jpg'),
    ("581", 'Sparilillililili', 'https://www.w3schools.com/images/w3schools_green.jpg');



CREATE TABLE IF NOT EXISTS contracts (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255)
);

CREATE TABLE IF NOT EXISTS user_contracts (
    CONSTRAINT user_contracts_assignes PRIMARY KEY (user_id, contract_id),
    user_id INT NOT NULL,
    CONSTRAINT `user_constraint`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    contract_id INT NOT NULL,
    CONSTRAINT `contract_constraint`
    FOREIGN KEY (contract_id) REFERENCES contracts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);