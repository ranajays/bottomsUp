exports.viewRecipe = function(req, res) {
	var mongodb = require('mongodb');
	var databaseUrl = "ranajays:ranajays@troup.mongohq.com:10078/app21902449"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes", "cabinets"];
	var db = require("mongojs").connect(databaseUrl, collections);
	var drink_id = 0;
	if (req.query['id']) {
		drink_id = req.query['id'];		
	}
	db.drinks.find({id: parseInt(drink_id)}, {}, function(err, docs){
		if (err) {
			console.log('err'+ err);
			return;
		}
		if (docs.length == 0) {
			res.render('recipe');
		}
		else {
			var ingredients = docs[0].ingredient_list.split('\n');
			var ingredient_list = "";
			for (var i = 0; i < ingredients.length; i++) {
				ingredient_list += "<li>"+ingredients[i]+"</li>\n";
			}
			res.render('recipe', {success: true, data: {drink_name: docs[0].drink, image_url: docs[0].image_url, ingredient_list: ingredient_list, instructions: docs[0].instructions}});
		}
	});
};