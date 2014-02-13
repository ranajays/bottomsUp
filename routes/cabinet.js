
/*
 * GET home page.
 */

exports.view = function(req, res){
	var mongodb = require('mongodb');
	var databaseUrl = "ranajays:ranajays@troup.mongohq.com:10078/app21902449"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes", "cabinets"];
	var db = require("mongojs").connect(databaseUrl, collections);
	db.ingredients.find({}, {}, function(err,docs) {
		if (err) {
			console.log("error:" + err);
		}
		else {
			var ingredients = [];
			var ingredientMap = {};
			for (var i = 0; i < docs.length; i++) {
				ingredients.push({label: docs[i].ingredient, id: docs[i].id});
				ingredientMap[docs[i].id] = {ingredient: docs[i].ingredient, image_url: docs[i].image_url};
			}
			db.cabinets.find({user_id: 1}, {}, function (err,docs) {
				console.log(docs);
				cabinet = [];
				for (var i = 0; i < docs.length; i++) {
					cabinet.push(ingredientMap[docs[i].ingredient_id]);
				}
				res.render('cabinet', {
					cabinet: cabinet,
					ingredients: JSON.stringify(ingredients)});
			});
		}
	});
	// var $ = res.window.jQuery;
	// var availableTags = [
	// 				      "ActionScript",
	// 				      "AppleScript",
	// 				      "Asp",
	// 				      "BASIC",
	// 				      "C",
	// 				      "C++",
	// 				      "Clojure",
	// 				      "COBOL",
	// 				      "ColdFusion",
	// 				      "Erlang",
	// 				      "Fortran",
	// 				      "Groovy",
	// 				      "Haskell",
	// 				      "Java",
	// 				      "JavaScript",
	// 				      "Lisp",
	// 				      "Perl",
	// 				      "PHP",
	// 				      "Python",
	// 				      "Ruby",
	// 				      "Scala",
	// 				      "Scheme"
	// 				    ];
 //    $( "#add_ingredient" ).autocomplete({
 //      source: availableTags
 //    });
};
