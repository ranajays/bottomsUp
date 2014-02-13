
/*
 * GET home page.
 */

exports.view = function(req, res){
	var mongodb = require('mongodb');
	var databaseUrl = "ranajays:ranajays@troup.mongohq.com:10078/app21902449"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes", "cabinets"];
	var db = require("mongojs").connect(databaseUrl, collections);
	db.cabinets.find({user_id: 1}, {}, function (err,docs) {
		ingredients = [];
		for (var i = 0; i < docs.length; i++) {
			ingredients.push(parseInt(docs[i].ingredient_id));
		}
		db.recipes.group({
	  			key: {drink_id: true},
	  			cond: {ingredient_id: {$nin: ingredients}},
	  			reduce: function(curr, result) {
	  				result.remainder.push(curr.ingredient_id);
	  			},
	  			initial: {remainder : []}
	  		}, function (err, docs) {
	  			// console.log(docs);
	  			remainders = docs;
	  			db.ingredients.find({}, {}, function(err, docs){
	  				ingredients ={};
	  				for (var i =0; i < docs.length; i++) {
	  					ingredients[docs[i].id] = docs[i];
	  				}
	  				// console.log(ingredients);
	  				db.drinks.find({}, {}, function(err, docs){
	  					drinks ={};
		  				for (var i =0; i < docs.length; i++) {
		  					drinks[docs[i].id] = docs[i];
		  				}
		  				drinklist = [];
			  			for (var i = 0; i < remainders.length; i++) {
			  				var additional = 1;
			  				if (req.query['additional']) {
			  					additional = req.query['additional'];
			  				}
			  				if (additional == remainders[i]['remainder'].length) {
			  					var price = 0;
			  					var rem_ing = [];
			  					for (var j = 0; j < additional; j++) {
			  						price += 1;
			  						// price += ingredients[(remainders[i]['remainder'])[j]]['price']
			  						rem_ing.push(ingredients[(remainders[i]['remainder'])[j]]['ingredient']);
			  					}
								drinklist.push({drink_id: remainders[i].drink_id, drink_name: drinks[remainders[i].drink_id].drink, image_url: drinks[remainders[i].drink_id].image_url, remainder:rem_ing, price:price});
			  					console.log(drinklist);
			  				}
			  			}
			  			res.render('makeDrinks', drinklist);
		  			});
	  			});
	  			
	  		});
		// db.recipes.group();
	});
};

