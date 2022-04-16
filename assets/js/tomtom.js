var trafficMapEL = document.querySelector("#traffic-map");
var trafficMapBtn = document.querySelector("#toggle-traffic-button");
var searchFormEl = document.querySelector("#search-form");
var searchFormInput = document.querySelector("#search-input");
//tomtom perameters
const TomBUrl = "https://api.tomtom.com/";
const TApiKey = "I28sS2O89AHgGz3gUm9lZBAXNk2HwB0N";
const versionNumber = 4;
const thickness = "absolute";
const ext = "json";
const style = "relative";
const zoom = 12;
const format = "json"
const versionNumberOne = 2;

 function mapData(data) {
console.log(data);
 }



//3636 Habersham Rd NW, Atlanta, GA 30305

function getStreetAddress(street) {
var url = `${TomBUrl}search/${versionNumberOne}/geocode/${street}.${ext}?key=${TApiKey}`;

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var streetObject = data.results[0];
        
        var lat = streetObject.position.lat; 
        var lon = streetObject.position.lon;
        var point = lat + "," + lon;
        console.log(point);
        var currentTrafficUrl = `${TomBUrl}traffic/services/${versionNumber}/flowSegmentData/${style}/${zoom}/${format}?key=${TApiKey}&point=${point}`;
        
        fetch(currentTrafficUrl)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            mapData(data);
        })
   
    });
    
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    var street = searchFormInput.value;
    getStreetAddress(street);
}


function addEventListeners() {
    searchFormEl.addEventListener("submit", handleFormSubmit);
    // buttonContainerEl.addEventListener("click", handleButtonClick);
}

function init() {
    addEventListeners();
}

init();