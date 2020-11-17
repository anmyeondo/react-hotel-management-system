CREATE TABLE Room_Type (
	Room_Type VARCHAR(20) NOT NULL,
	Single_Beds INT NOT NULL,
	Double_Beds INT NOT NULL,
	Ondol_Set INT NOT NULL,
	Size INT NOT NULL,
	Price_won INT NOT NULL,
	Capacity INT NOT NULL,
	PRIMARY KEY(Room_Type)
)ENGINE=InnoDB DEFAULT CHARSET=utf8