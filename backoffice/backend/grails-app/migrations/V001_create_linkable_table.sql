CREATE TABLE LINKABLE (
    id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
    public_link             VARCHAR(255)        NOT NULL,
    public_link_expiration  DATETIME(6)         NOT NULL,
    document_id             BIGINT,
    folder_id               BIGINT,
    FOREIGN KEY (document_id) REFERENCES DOCUMENT(id),
    FOREIGN KEY (folder_id) REFERENCES FOLDER(id)
);

