const fetch = require("node-fetch");
var fs = require('fs');
var now = require("../utils/dateTime");

function getIngProducts(bankName, baseGetProductUrlBank, ver, xv, endpoint) {

  var fetchURL = baseGetProductUrlBank + "v" + ver + endpoint;

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
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var responseData = JSON.stringify(response, null, 2);
      var filename = "./opt/PRODUCTS/" + bankName + "/products_v" + ver + "_x-v" + xv + ".json";

      fs.writeFileSync(filename, responseData, {
        flag: 'w'
      }, function(err) {
        if (err) {
          console.error("Error while saving data to file : " + err);
        }
      });
      printProducts(response, bankName);
    }).catch(function(error) {
      console.log(error);
    });
}


function printProducts(responseDataInJson, bankName) {

  //GET products has this response . total number of records / products
  var prodCount = responseDataInJson.meta.totalRecords;
  var totalPages = responseDataInJson.meta.totalPages;

  // console.log(bankName + "  as on : " + now.getLocalDateAndTime_AU() + "\ntotalRecords: " + prodCount + "\ntotalPages: " + totalPages);

  var products = [];

  for (var i = 0; i < prodCount; i++) {
    // console.log("\n\n ----------" + i + "--------- \n\n ");
    var productId = responseDataInJson.data.products[i].productId;
    var name = responseDataInJson.data.products[i].name;
    var description = responseDataInJson.data.products[i].description;
    var category = responseDataInJson.data.products[i].productCategory;

    products[i] = {
      productId,
      name,
      description,
      category
    }

    if (i == prodCount - 1) {
      productId_0 = "Last Screen on APP"
      name_0 = bankName + " products !" // This is the first screen of APP, shall have bank name
      // description_0 = "Thank you for using `My Bank -AU-9` app.\n\nThis data was last updated on : lastUpdatedTime"
      description_0 = "Thank you for using `My Bank -AU-9` app.\n\nThis data was last updated on : " + now.getLocalDateAndTime_AU()
      category_0 = "Type of Accounts"

      // Add this to begining of array
      products.unshift({
        'productId': productId_0,
        'name': name_0,
        "description": description_0,
        "category": category_0
      })

      productId_n = "Last Screen"
      name_n = "-- About App --"
      description_n = "Hope you enjoyed " + bankName + " product details on your wrist (fitbit) !\n\n`My Bank -AU-9` app displays products offered by " + bankName + " Bank (Australia).\n\nData is provided available as per Consumer Data Right (ACCC), Australia (alos known as Open Banking).\n\nList of products displayed may not contain all the products currently offered by the bank.\n\Hence, for making any financial decision always go to : https://www." + bankName + ".com.au/"
      category_n = "Type of Products"

      // Add this to end of the array
      products.push({
        'productId': productId_n,
        'name': name_n,
        "description": description_n,
        "category": category_n
      })

      // description_n = "Enjoy the " + bankName + " Product details on your wrist (fitbit) !\n\n`My Bank -AU-9` app displays products offered by " + bankName + " Bank (Australia).\n\nData is provided available as per Consumer Data Right (ACCC), Australia (alos known as Open Banking).\n\nImportant Note: List of products may not contain all the products offered by the bank.\n\Hence, for making any financial decision always go to : https://www." + bankName + ".com.au/.\n\nDisclaimer: Developer of this app does not accept any liability for information contained in this app."

      productId_n_1 = "Last Screen final"
      name_n_1 = "-- Disclaimer --"
      // description_n_1 = "The information provided by the developer of this app is for general  does not accept any liability for information contained in this app."
      description_n_1 = "The information provided by the developer of this app is for general informational purposes only and is provided in good faith.However we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information displayed."
      category_n_1 = "Type of Products final"

      //All writers’ opinions are their own and do not constitute financial advice in any way whatsoever. Nothing published by CoinDesk constitutes an investment recommendation, nor should any data or Content published by CoinDesk be relied upon for any investment activities.

      //CoinDesk strongly recommends that you perform your own independent research and/or speak with a qualified investment professional before making any financial decisions.

      // Add this to end of the array
      products.push({
        'productId': productId_n_1,
        'name': name_n_1,
        "description": description_n_1,
        "category": category_n_1
      })


    }
  }

  var filename = "./opt/PRODUCTS/" + bankName + "/fitbit/products.json";

  /* Format the response as desired by fitbit companion*/
  var productReadyForFitbit = "{\"products\":" + JSON.stringify(products, null, 2) + "}";

  fs.writeFileSync(filename, productReadyForFitbit, {
    flag: 'w'
  }, function(err) {
    if (err) throw err;
    console.log('complete');
  });

}

module.exports = {
  getIngProducts
};
