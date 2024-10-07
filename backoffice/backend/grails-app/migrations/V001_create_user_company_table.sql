CREATE TABLE USER_COMPANY (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    role         VARCHAR(255)        NOT NULL,
    user_id      BIGINT              NOT NULL,
    company_id   BIGINT              NOT NULL,
    FOREIGN KEY (user_id)    REFERENCES USER(id),
    FOREIGN KEY (company_id) REFERENCES COMPANY(id)
);

INSERT INTO USER_COMPANY (role, user_id, company_id)
VALUES ('owner', 1, 1);