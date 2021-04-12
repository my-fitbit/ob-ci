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

  var products1 = [];
  var j = 0;
  for (var i = 0; i < prodCount; i++) {
    if (responseDataInJson.data.products[i].productCategory === "TRANS_AND_SAVINGS_ACCOUNTS") {
      // console.log("\n\n ----------" + i + "--------- \n\n ");
      var productId = responseDataInJson.data.products[i].productId;
      var name = responseDataInJson.data.products[i].name;
      var description = responseDataInJson.data.products[i].description;
      var category = responseDataInJson.data.products[i].productCategory;

      products1[j++] = {
        productId,
        name,
        description,
        category
      }
    }

    if (i == prodCount - 1) {
      productId_0 = "Last Screen on APP"
      name_0 = bankName + " Products !\nTransaction & Savings Accounts" // This is the first screen of APP, shall have bank name
      description_0 = "Thank you for using `My Bank -AU-9` app.\n\nThis data was last updated on : " + now.getLocalDateAndTime_AU_DD_MMM_YYY() + "\n\nTo know more details and background on open banking in Australia, visit:\n\nhttps://treasury.gov.au/consumer-data-right"

      category_0 = "Type of Accounts"

      // Add this to begining of array
      products1.unshift({
        'productId': productId_0,
        'name': name_0,
        "description": description_0,
        "category": category_0
      })

      productId_n = "Last Screen"
      name_n = "Disclaimer !!"
      description_n = "The content of this app is for information purposes only.\n\nThe open data available from this app is for general reference only.\n\nUsers are encouraged to check with the individual bank to make any financial decision.\n\nThe Developer of the app does not guarantee, and accepts no legal liability whatsoever arising from, or connected to, the use of any material contained in this app."
      category_n = "Type of Products"

      // Add this to end of the array //push
      products1.unshift({
        'productId': productId_n,
        'name': name_n,
        "description": description_n,
        "category": category_n
      })
    }
  }

  var filename = "./opt/PRODUCTS/" + bankName + "/fitbit/products.json";

  /* Format the response as desired by fitbit companion*/
  var productReadyForFitbit = "{\"products\":" + JSON.stringify(products1, null, 2) + "}";
  
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
