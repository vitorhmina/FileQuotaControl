CREATE TABLE COMPANY (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(255) unique NOT NULL,
    quota        INT                 NOT NULL
);

INSERT INTO COMPANY (title, quota)
VALUES ('Test Company', 100);