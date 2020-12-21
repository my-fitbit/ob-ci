const fetch = require("node-fetch");
var fs = require('fs');
var now = require("../utils/dateTime");

function getIngProducts(bankName, baseGetProductUrlBank, ver, xv, endpoint) {
    
    var fetchURL =  baseGetProductUrlBank + "v" + ver + endpoint;
    
    console.log("URL : " + fetchURL + " | xv " + xv + "\n");

    var myHeaders = new fetch.Headers();
    myHeaders.append("x-v", xv);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    fetch(fetchURL, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var responseData = JSON.stringify(response, null, 2);
            var filename = "./opt/PRODUCTS/" + bankName + "/products_v" + ver + "_x-v" + xv + ".json";

            fs.writeFileSync(filename, responseData, {flag: 'w'}, function (err) {
                if (err) {
                    console.error("Error while saving data to file : " + err);
                }
            });
            printProducts(response,bankName);
        }).catch(function (error) { console.log(error); });
}


function printProducts(responseDataInJson, bankName) {

    //GET products has this response . total number of records / products
    var prodCount = responseDataInJson.meta.totalRecords;

    console.log(bankName + " : has total products :" + prodCount);
//    console.log(bankName + " : has total products :" + prodCount + "  as on : " + now.getLocalDateAndTime_AU() );
	
    var products = [];

    for (var i = 0; i < prodCount; i++) {
        var productId = responseDataInJson.data.products[i].productId;
        var name = responseDataInJson.data.products[i].name;
        var description = responseDataInJson.data.products[i].description;

        products[i] = { productId, name, description }
        
	if (i == prodCount - 1) {
	    productId_0 = "Last Screen on APP"
            name_0 = "Welcome !"
            description_0 = "Thank you for using my ING AU app.\n\nThis data was last updated on: lastUpdatedTime"
		
            // Add this to begining of array
            products.unshift({ 'productId': productId_0, 'name': name_0, "description": description_0 })

            productId_n = "Last Screen"
            name_n = "-- About App --"
            description_n = "Enjoy the "+ bankName +" Product details on your wrist (fitbit) !\n\n`My ING AU` app displays publically availabe list of products offered by "+ bankName +" Bank (Australia).\nThis is as per Open Banking mandate by Australia Gov (CDS).\n\nNote: List of products may not contain all the products offered by the bank.\n\nAnd for making any finincial decision always go to : https://www."+bankName+".com.au/.\n\n\n Important Disclaimer: Developer of the this app does not accept liability for information contained in this app."

            // Add this to end of the array
            products.push({ 'productId': productId_n, 'name': name_n, "description": description_n })


        }
    }

    var filename = "./opt/PRODUCTS/"+bankName+"/fitbit/products.json";
    
    /* Format the response as desired by fitbit companion*/
    var productReadyForFitbit = "{\"products\":" + JSON.stringify(products, null, 2) + "}";
	
    fs.writeFileSync(filename, productReadyForFitbit, {flag: 'w'}, function (err) {
        if (err) throw err;
        console.log('complete');
    });
    
}

module.exports = { getIngProducts };
