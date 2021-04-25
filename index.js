const products = require("./banks/products");
const utils = require("./utils/dateTime")

console.log("Run Started at (Sydney time) : " + utils.getLocalDateAndTime_AU() + "\n\n");

function getProductDtails() {
  //TODO - currently hardcoded version, need to implement a logic to auto update it on fail
  /*  *************  ING Parameters *************/
  BANK = "ING";
  URL_GET_PRODUCTS = "https://apic.ing.com.au/cds-au/";
  endpoint = "/banking/products?page-size=500";
  URL_VER_GET_PROD = 1;
  xv_GET_PROD = 2;

  console.log("GET - PRODUCTS API for : " + BANK);
  var response = products.getProducts(BANK, URL_GET_PRODUCTS, URL_VER_GET_PROD, xv_GET_PROD, endpoint);

  /*  *************  CBA Parameters *************/
  BANK = "CBA";
  URL_GET_PRODUCTS = "https://api.commbank.com.au/public/cds-au/";
  endpoint = "/banking/products?page-size=500";
  URL_VER_GET_PROD = 1;
  xv_GET_PROD = 3;

  console.log("GET - PRODUCTS API for : " + BANK);
  var response = products.getProducts(BANK, URL_GET_PRODUCTS, URL_VER_GET_PROD, xv_GET_PROD, endpoint);

  /*  *************  NAB Parameters *************/ /////////
  BANK = "NAB";
  URL_GET_PRODUCTS = "https://openbank.api.nab.com.au/cds-au/";
  endpoint = "/banking/products?page-size=500"; // page-size=100 because CBA has 72 products and page size 25
  URL_VER_GET_PROD = 1;
  xv_GET_PROD = 2;

  console.log("GET - PRODUCTS API for : " + BANK);
  var response = products.getProducts(BANK, URL_GET_PRODUCTS, URL_VER_GET_PROD, xv_GET_PROD, endpoint);

  /*  *************  ANZ Parameters *************/ /////////
  BANK = "ANZ";
  URL_GET_PRODUCTS = "https://api.anz/cds-au/";
  endpoint = "/banking/products?page-size=500";
  URL_VER_GET_PROD = 1;
  xv_GET_PROD = 2;

  console.log("GET - PRODUCTS API for : " + BANK);
  var response = products.getProducts(BANK, URL_GET_PRODUCTS, URL_VER_GET_PROD, xv_GET_PROD, endpoint);

  /*  *************  WSP Parameters *************/ /////////
  BANK = "WSP";
  URL_GET_PRODUCTS = "https://digital-api.westpac.com.au/cds-au/";
  endpoint = "/banking/products?page-size=500";
  URL_VER_GET_PROD = 1;
  xv_GET_PROD = 3;

  /*Note: currently not using this one hence commented*/
  // console.log("GET - PRODUCTS API for : " + BANK);
  // var response = products.getProducts(BANK, URL_GET_PRODUCTS, URL_VER_GET_PROD, xv_GET_PROD, endpoint);
}

getProductDtails();