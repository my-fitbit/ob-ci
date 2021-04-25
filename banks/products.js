const fetch = require("node-fetch");
var fs = require('fs');
var now = require("../utils/dateTime");
var commonUtils = require("../utils/common");

var TRANS_AND_SAVINGS_ACCOUNTS = "TRANS_AND_SAVINGS_ACCOUNTS"
var CRED_AND_CHRG_CARDS = "CRED_AND_CHRG_CARDS"
var RESIDENTIAL_MORTGAGES = "RESIDENTIAL_MORTGAGES"

const productTypeEnum = { //key:value
  TRANS_AND_SAVINGS_ACCOUNTS,
  CRED_AND_CHRG_CARDS,
  RESIDENTIAL_MORTGAGES
};

function getProducts(bankName, baseGetProductUrlBank, ver, xv, endpoint) {

  var fetchURL = baseGetProductUrlBank + "v" + ver + endpoint;
  console.log("URL : " + fetchURL + " | xv " + xv + "\n");

  var myHeaders = new fetch.Headers();
  myHeaders.append("x-v", xv);
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("product-category", productTypes);


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
      var filename = "./opt/PRODUCTS/" + bankName + "/fitbit/" + "products_v" + ver + "_x-v" + xv + ".json";

      wrieToFile(filename, responseData);

      for (let element in productTypeEnum) {
        printProducts(response, bankName, productTypeEnum[element]);
      }

    }).catch(function(error) {
      console.log(error);
    });
}


function printProducts(responseDataInJson, bankName, productTypes) {

  //GET products has this response . total number of records / products
  var prodCount = responseDataInJson.meta.totalRecords;

  var products1 = [];
  var j = 0;
  for (var i = 0; i < prodCount; i++) {
    if (responseDataInJson.data.products[i].productCategory === productTypes) {
      var name = responseDataInJson.data.products[i].name;
      var desc = responseDataInJson.data.products[i].description;

      products1[j++] = {
        name,
        desc
      }
    }

    var spacedString = commonUtils.replace_withSpace(productTypes);
    var titleCaseProductype = commonUtils.getTitleCase(spacedString);

    if (i == prodCount - 1) {
      name_0 = bankName + " - Product's !\n" + titleCaseProductype; // This is the first screen of APP, shall have bank name
      desc_0 = "Thank you for using `my Bank-AU` app ♥  .\n\nThis data was last updated on :\n" + now.getLocalDateAndTime_AU_DD_MMM_YYY() + "\n\nTo know more about open banking in Australia, 🇦🇺 :\n\nhttps://treasury.gov.au/consumer-data-right."

      // Add this to begining of array
      products1.unshift({
        'name': name_0,
        "desc": desc_0
      })

      name_n = "Disclaimer !!"
      desc_n = "The content of this app is provided for information purposes only.\n\nThe public (open) data available in this app is intended to be general reference source.]\n\nUsers are encouraged to check with the individual bank before making any financial decision.\n\n❗❗ The Developer of the app does not guarantee, and accepts no legal liability whatsoever arising from, or connected to, the use of any material contained in this app."

      // Add this to end of the array //push
      products1.unshift({
        'name': name_n,
        "desc": desc_n
      })
    }
  }

  let productsCount = products1.length;
  var filename = "./opt/PRODUCTS/" + bankName + "/fitbit/" + productTypes + "/products.json";

  /* Format the response as desired by fitbit companion*/
  var productReadyForFitbit = "{\"data\": {\"products\":" + JSON.stringify(products1) + "},\"size\": \"" + productsCount + "\"}";
  // while debugging to see pretty json -
  // var productReadyForFitbit = "{\"data\": {\"products\":" + JSON.stringify(products1, null, 2) + "},\"size\": \"" + productsCount + "\"}";

  wrieToFile(filename, productReadyForFitbit);

}

/*This function writes
- @data
- to a @filename ( with complete path from root)
*/
function wrieToFile(filename, data) {
  fs.writeFileSync(filename, data, {
    flag: 'w'
  }, function(err) {
    if (err) {
      console.error("Error while saving data to file : " + err);
    }
  });
}

module.exports = {
  getProducts
};
