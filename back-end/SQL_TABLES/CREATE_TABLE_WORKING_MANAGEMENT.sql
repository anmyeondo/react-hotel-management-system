CREATE TABLE Working_Management
(
    ID INT AUTO_INCREMENT ,
    Staff_ID INT NOT NULL,
    Punch_In_Time DATETIME NOT NULL,
    Punch_Out_Time DATETIME NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY(Staff_ID) REFERENCES Staff (ID) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB DEFAULT CHARSET=utf8