CREATE TABLE DOCUMENT (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid           VARCHAR(255)        NOT NULL,
    name           VARCHAR(255)        NOT NULL,
    description    VARCHAR(255),
    creation_date  DATETIME(6)         NOT NULL,
    status         VARCHAR(255)        NOT NULL,
    user_id        BIGINT              NOT NULL,
    company_id     BIGINT              NOT NULL,
    folder_id      BIGINT,
    FOREIGN KEY (user_id)      REFERENCES USER(id),
    FOREIGN KEY (company_id)   REFERENCES COMPANY(id),
    FOREIGN KEY (folder_id)    REFERENCES FOLDER(id)
);
/*
INSERT INTO DOCUMENT (name, description, creation_date, status, user_id, company_id, folder_id)
VALUES ('First Document', 'description', NOW(), 'ACTIVE', 1, 1, 1);

*/
