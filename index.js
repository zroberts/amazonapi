var amazon = require('./lib/index.js');

modules.exports = {
	setApi: function(id, secret, tag){
		var client = amazon.createClient({
			awsId: id,
			awsSecret: secret,
			awsTag: tag
		})
	},
	search: function(searchItem, callback){
		if(!client){
			callback("Please declare client");
		}
		client.itemSearch({
			Keywords: searchItem
		},function(err, results){
			if(err){
				callback(err);
			}else{
				var amazonArray = [];
				for(var i = 0; i < 10; i++){
					var amazonResponse = {
						id: results[i].ASIN[0],
						name: '',
						price: '',
						salePrice: null,
						category: '',
						url: results[i].DetailPageURL[0],
						imageUrl: results[i].LargeImage[0].URL[0],
						provider: 'Amazon',
						hasReviews: '',
						reviews: '',
						description: ''	
					}
					for(var e = 0; e < results[i].ItemAttributes.length; e++){
						amazonResponse.name = results[i].ItemAttributes[e].Title[0];
						amazonResponse.category = results[i].ItemAttributes[e].Binding[0];
						if(results[i].ItemAttributes[e].ListPrice){
							amazonResponse.price = results[i].ItemAttributes[e].ListPrice[0].Amount[0];
						}else{
							amazonResponse.price = '-1';
						}
						amazonResponse.description += "<ul>";
						for(var f=0; f < results[i].ItemAttributes[e].Feature.length; f++){
							amazonResponse.description += "<li>";
							amazonResponse.description += results[i].ItemAttributes[e].Feature[f];
							amazonResponse.description += "</li>";
						}
						amazonResponse.description += "</ul>";
					} 
					amazonResponse.hasReviews = results[i].CustomerReviews[0].HasReviews[0];
					if(amazonResponse.hasReviews == 'true'){
						amazonResponse.reviews = results[i].CustomerReviews[0].IFrameURL[0];
					}

					amazonArray.push(amazonResponse);
				}
				callback(null, amazonArray);
			}
		})
	}

}