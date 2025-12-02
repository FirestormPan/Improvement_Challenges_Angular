CREATE DATABASE IF NOT EXISTS improvementdares;
USE improvementdares;

CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255),
    hashed_password varchar(255),
    pfp varchar(255) DEFAULT "https://www.w3schools.com/images/w3schools_green.jpg",
    email varchar(255)
);


INSERT INTO users (id, username, pfp, email) VALUES
    (1, 'pantelos', 'Default', 'pantelos@example.com'),
    (2, 'maria', 'Default', 'maria@example.com'),
    (3, 'slavanderos', 'Default', 'slavanderos@example.com'),
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
    (1000,"lego","$2b$05$ZdU2CxnOiMKXv7yXjj2BRObaBXOIFD3KsHugR9VQDKR5FUV8zzafK","https://www.w3schools.com/images/w3schools_green.jpg","pantelos1999@gmail.com")

select * from users;

CREATE TABLE IF NOT EXISTS contracts (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title varchar(100),
    description varchar(255),
	color varchar(50),
    dueDate datetime
);

INSERT INTO contracts (id, title, description, color) VALUES
 (1, 'contract 1' , 'initial contract', "yellow");
select * from contracts;


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

INSERT INTO USER_CONTRACTS VALUES (1000,1);
INSERT INTO USER_CONTRACTS VALUES (2,1);
select * from USER_CONTRACTS;