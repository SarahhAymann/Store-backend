CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    userName VARCHAR(150),
    passwordHashed VARCHAR(200)
);