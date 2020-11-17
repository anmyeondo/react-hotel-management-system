CREATE TABLE Membership_Rank (
	Rank VARCHAR(50) NOT NULL,
	Accumulation_Rate INT NOT NULL,
	Discount_Rate INT NOT NULL,
	Price_Month INT NOT NULL,
	PRIMARY KEY (Rank)
) ENGINE=INNODB CHARSET=UTF8;