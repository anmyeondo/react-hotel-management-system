CREATE TABLE Staff
(
    Staff_ID INT AUTO_INCREMENT ,
    Hotel_ID INT NOT NULL,
    Inform_ID INT NOT NULL,
    Code INT NOT NULL,
    Rank VARCHAR(50) NOT NULL,
    Bank VARCHAR(50) NOT NULL,
    Account VARCHAR(50) NOT NULL,
    Staff_Password VARCHAR(65),
    RegDate DATE NOT NULL,
    Salary INT NOT NULL,
    Is_Available boolean NOT NULL,
    PRIMARY KEY (Staff_ID),
    FOREIGN KEY (Hotel_ID, Code) REFERENCES Department(Hotel_ID, Code) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Inform_ID) REFERENCES Information(Inform_ID) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB DEFAULT CHARSET=utf8