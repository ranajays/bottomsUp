select drinkName 
from 
(select drinkID as dID, count(drinkID) as owned from Recipe where IngredientID in (1,2)
group by drinkID), Drinks
where dID = drinkID and ingredientNumber-owned = 1;

select Ingredients.ingredientName 
from Drinks,Ingredients, Recipe
where Drinks.drinkID = Recipe.drinkID and Ingredients.ingredientID = Recipe.ingredientID and Ingredients.ingredientID not in (1,2);