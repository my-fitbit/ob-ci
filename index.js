console.log("Wow this works !");

const fetch = require("node-fetch");
var fs = require('fs');

callEndpointAndFetresponse();

function callEndpointAndFetresponse() {
    /* 
    Actual utl : https://gist.github.com/my-fitbit/afcc19876d87c41c0401f07184bb5b44#file-200-json
    using raw url to get jsson response in fetch
    */
    fetch("https://gist.githubusercontent.com/my-fitbit/afcc19876d87c41c0401f07184bb5b44/raw/c7977e2873fbd77003929369a383d592cbadb8f3/200.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // convert JSON n Response string
            var responseData = JSON.stringify(response);

            console.log("\n Response body recieved is : " + responseData);

            /*
            Let's save and write response to a json file  
            located at ./opt/products.json
            */
            fs.writeFileSync("./opt/products.json", responseData, function (err) {
                if (err) {
                    console.log("Error while saving data to file : " + err);
                }
                console.log("JSON data is saved.");
            });

        })
        .catch(function (error) { console.log(error); });
}