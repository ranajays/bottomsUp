
/*
 * GET home page.
 */

exports.view = function(req, res){
	var mongodb = require('mongodb');
	var databaseUrl = "ranajays:ranajays@troup.mongohq.com:10078/app21902449"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes", "cabinets"];
	var db = require("mongojs").connect(databaseUrl, collections);
	if (req.query['add_ingredient']) {
		db.cabinets.ensureIndex({"user_id": true, "ingredient_id": true}, {unique: true});
		db.cabinets.save({user_id: 1, ingredient_id: parseInt(req.query["add_ingredient"])});
	}
	if (req.query['delete_all'] == 'true') {
		db.cabinets.remove({user_id: 1});
	}
	if (req.query['delete_ingredient']) {
		db.cabinets.remove({user_id: 1, ingredient_id: parseInt(req.query["delete_ingredient"])});
	}
	db.ingredients.find({}, {}, function(err,docs) {
		if (err) {
			console.log("error:" + err);
		}
		else {
			var ingredients = [];
			var ingredientMap = {};
			for (var i = 0; i < docs.length; i++) {
				ingredients.push({label: docs[i].ingredient, id: docs[i].id});
				ingredientMap[docs[i].id] = {id: docs[i].id, ingredient: docs[i].ingredient, image_url: docs[i].image_url};
			}
			db.cabinets.find({user_id: 1}, {}, function (err,docs) {
				cabinet = [];
				for (var i = 0; i < docs.length; i++) {
					cabinet.push(ingredientMap[docs[i].ingredient_id]);
				}
				// console.log(cabinet);
				res.render('cabinet', {
					cabinet: cabinet,
					ingredients: JSON.stringify(ingredients)});
			});
		}
	});
};
