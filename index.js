const products = require("./banks/products");



//TODO - currently hardcoded version, need to implement a logic to auto update it on fail
/*  *************  ING Parameters *************/
BANK = "ING";
URL_GET_PRODUCTS = "https://apic.ing.com.au/cds-au/";
endpoint = "/banking/products";
URL_VER_GET_PROD = 1;
xv_GET_PROD = 3;


/*  *************  CBA Parameters *************
BANK = "CBA";
URL_GET_PRODUCTS = "https://api.commbank.com.au/public/cds-au/";
endpoint = "/banking/products";
URL_VER_GET_PROD = 1;
xv_GET_PROD = 2;
*/

console.log(BANK + " : GET - PRODUCTS API");
var response  = products.getIngProducts(BANK,URL_GET_PRODUCTS,URL_VER_GET_PROD,xv_GET_PROD, endpoint );
