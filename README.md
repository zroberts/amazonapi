# Amazon Api 
CS 320 XML
WVUP Fall 2016


## Installing
To install, first you need to add this line in your package.json file under the dependencies
```
"amazonapi": "git+https://github.com/zroberts/amazonapi.git"
```

Next, run npm install and it should pull down the files and install them.


## Setup Object
```
var amazon = require("amazonapi");
```

## Setting API Key
```
amazon.setApi("AKIAI7LCAK3FMX7NN47Q", "yAHkb+MUAwyV821RjTPiAW0EZCf3gk8M+oWA+tHO", "lcox2-20");
```

##########
## Searching
```
amazon.search(<searchTerm>, function(err, res){
	
});
```

### RETURN 
will return an array of json object with the following fields
```
[
	{
		id: <ASIN>,
		sku: "No SKU Available",
		name: <name of product returned>,
		price: <price of object, returns negative one if object has no price>,
		salePrice: null,
		category: <category of project>,
		url: <url to project>,
		imageUrl: <image url>
		provider: 'Amazon',
		hasReviews: <true or false, if it has reviews>,
		reviews: <iframe url for reviews>,
		description: <description of product>	
	}
]
```

#### To access the array - 
```
resp[i].id
resp[i].name
etc...
```

## Full Example
```
var amazon = require('amazonapi');

amazon.setApi("AKIAI7LCAK3FMX7NN47Q", "yAHkb+MUAwyV821RjTPiAW0EZCf3gk8M+oWA+tHO", "lcox2-20");


amazon.search(<searchItem>, function(err, res){
	if(err){
		console.log(err);
	}else{
		console.log(res);
	}

});
```