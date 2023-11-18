CREATE DATABASE IF NOT EXISTS improvement_dares;
USE improvement_dares;

CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255),
    profile_picture varchar(255) DEFAULT "https://www.w3schools.com/images/w3schools_green.jpg"
);

INSERT INTO users (username, profile_picture) VALUES
    ('administrator_p'),
    ('packman');

INSERT INTO users (username) VALUES
    ('pantelos', 'Default');

CREATE TABLE IF NOT EXISTS contracts (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255)
);

CREATE TABLE IF NOT EXISTS user_contracts (
    user_id INT NOT NULL,
    CONSTRAINT `user_constraint`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    contract_id INT NOT NULL,
    CONSTRAINT `contract_constraint`
    FOREIGN KEY (contract_id) REFERENCES contracts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT user_contracts_assignes PRIMARY KEY (user_id, contract_id)
);