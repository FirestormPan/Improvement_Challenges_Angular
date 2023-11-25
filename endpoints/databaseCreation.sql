CREATE DATABASE IF NOT EXISTS improvement_dares;
USE improvement_dares;


CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255),
    profile_picture varchar(255) DEFAULT "https://www.w3schools.com/images/w3schools_green.jpg",
    email varchar(255)
);

INSERT INTO users (id, username, profile_picture, email) VALUES
    (1, 'pantelos', 'Default', 'pantelos@example.com'),
    (2, 'maria', 'Default', 'maria@example.com'),
    (3, 'slavanderos', 'Default', 'slavanderos@example.com'),
    (4, 'anika', 'Default', 'anika@example.com'),
    (7, 'Pantelis', 'https://picsum.photos/200', 'pantelis@example.com'),
    (103, 'Aurorra', 'https://www.w3schools.com/images/w3schools_green.jpg', 'aurorra@example.com'),
    (513, 'Kosmas', 'https://www.w3schools.com/images/w3schools_green.jpg', 'kosmas@example.com'),
    (105, 'Ioanna', 'https://www.w3schools.com/images/w3schools_green.jpg', 'ioanna@example.com'),
    (123, 'Maria', 'https://www.w3schools.com/images/w3schools_green.jpg', 'maria2@example.com'),
    (100, 'Kwstas', 'https://www.w3schools.com/images/w3schools_green.jpg', 'kwstas@example.com'),
    (999, 'Dimitris', 'https://www.w3schools.com/images/w3schools_green.jpg', 'dimitris@example.com'),
    (309, 'Sindler', 'https://www.w3schools.com/images/w3schools_green.jpg', 'sindler@example.com'),
    (807, 'Zerg', 'https://www.w3schools.com/images/w3schools_green.jpg', 'zerg@example.com'),
    (582, 'Spaghetti', 'https://www.w3schools.com/images/w3schools_green.jpg', 'spaghetti@example.com'),
    (580, 'Spari', 'https://www.w3schools.com/images/w3schools_green.jpg', 'spari@example.com'),
    (581, 'Sparilillililili', 'https://www.w3schools.com/images/w3schools_green.jpg', 'sparilillililili@example.com');


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