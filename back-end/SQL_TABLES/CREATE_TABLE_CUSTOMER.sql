CREATE TABLE Customer (
	ID INT AUTO_INCREMENT,
	Inform_ID INT NOT NULL,
	Rank VARCHAR(50) NOT NULL,
	Validity_Month INT NOT NULL,
	Login_ID VARCHAR(50) NOT NULL,
	Login_PW VARCHAR(50) NOT NULL,
	Mileage INT NOT NULL,
	Reg_Date DATE NOT NULL,
	Membership_Due_Date DATE NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (Inform_ID) REFERENCES Information (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Rank) REFERENCES Membership_Rank (Rank) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Validity_Month) REFERENCES Membership_Validity(Validity_Month) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB CHARSET=UTF8;