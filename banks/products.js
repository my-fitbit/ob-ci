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
            productId_0 = "place-holder-self"
            name_0 = "My ING AU"
            description_0 = "The app displays list of products provided by ING Bank (Australia). All details are fetched from public `Products` data provided by the bank.\n\nSearch `Open Banking` or CDS by Gov. of Australia.\n\nEnjoy the Product details on your wrist (fitbit) !"

            // Add this to begining of array
            products.unshift({ 'productId': productId_0, 'name': name_0, "description": description_0 })

            productId_n = "Last Screen on APP"
            name_n = "Thank you !"
            description_n = "This data was last updated on "

            // Add this to end of the array
            products.unshift({ 'productId': productId_n, 'name': name_n, "description": description_n })


        }
    }

    var filename = "./opt/PRODUCTS/"+bankName+"/fitbit/products.json";

    fs.writeFileSync(filename, JSON.stringify(products, null, 2), {flag: 'w'}, function (err) {
        if (err) throw err;
        console.log('complete');
    });
    
}

module.exports = { getIngProducts };
