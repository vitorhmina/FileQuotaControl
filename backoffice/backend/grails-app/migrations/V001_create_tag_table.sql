CREATE TABLE TAG (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    label        VARCHAR(255)        NOT NULL,
    color        VARCHAR(255)        NOT NULL,
    company_id   BIGINT              NOT NULL,
    FOREIGN KEY (company_id) REFERENCES COMPANY(id)
);

INSERT INTO TAG (label, color, company_id)
VALUES ('Important', '#F00000', 1);