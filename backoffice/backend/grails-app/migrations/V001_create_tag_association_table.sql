CREATE TABLE TAG_ASSOCIATION (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    tag_id       BIGINT              NOT NULL,
    folder_id    BIGINT,
    document_id  BIGINT,
    FOREIGN KEY (tag_id)  REFERENCES TAG(id),
    FOREIGN KEY (folder_id) REFERENCES FOLDER(id),
    FOREIGN KEY (document_id) REFERENCES DOCUMENT(id)
);
/*
INSERT INTO TAG_ASSOCIATION (tag_id, folder_id, document_id)
VALUES (1, null, 1);

INSERT INTO TAG_ASSOCIATION (tag_id, folder_id, document_id)
VALUES (1, 1, null);
*/
