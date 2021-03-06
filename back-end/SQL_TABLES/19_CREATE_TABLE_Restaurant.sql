CREATE TABLE Restaurant (
	Restaurant_Name VARCHAR(50) NOT NULL,
	Hotel_ID INT NOT NULL,
	Open_Time TIME NOT NULL,
	Close_Time TIME NOT NULL,
	PRIMARY KEY(Restaurant_Name, Hotel_ID),
	FOREIGN KEY(Hotel_ID) REFERENCES Hotel(Hotel_ID) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8