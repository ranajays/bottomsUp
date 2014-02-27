create table Drinks(drinkID int, drinkName text, ingredientNumber int);
create table Ingredients(ingredientID int, ingredientName text);
create table Recipe(drinkID int, ingredientID int);