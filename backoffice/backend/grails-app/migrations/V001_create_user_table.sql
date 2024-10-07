CREATE TABLE USER (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    username     VARCHAR(255) unique NOT NULL,
    first_name   VARCHAR(255)        NOT NULL,
    last_name    VARCHAR(255)        NOT NULL,
    email        VARCHAR(255) unique NOT NULL,
    password     VARCHAR(255)        NOT NULL,
    enabled      BIT,
    token        VARCHAR(255),
    token_limit  DATETIME(6),
    user_type_id BIGINT              NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES USER_TYPE(id)
);

INSERT INTO USER (username, first_name, last_name, email, password, enabled, user_type_id)
VALUES ('admin', 'admin', 'admin', 'admin@email', '$2a$10$1gVWe0GmjRcl1oJx8LU78uOdchKUsMdfNGkvw/fUFJ2j5BcDdE6VK', true, 1);

