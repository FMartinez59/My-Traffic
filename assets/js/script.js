/// Laura's JS
var firstScreen = document.querySelector(".first-screen")
var mapCont = document.querySelector(".map")
var sidebar = document.querySelector(".sidebar")
var form = document.querySelector("#search-form")
var secondScreen = document.querySelector(".second-screen")
var titleEl = document.querySelector("#title")
var mapSwitchRealty = document.querySelector("#ms-realty")
var mapSwitchTraffic = document.querySelector("#ms-traffic")
var trafficMap = document.querySelector("#map1")
var realtyMap = document.querySelector("#map2")
var searchFormInput = document.querySelector("#search-input");




// This API shows properties that are listed for sale in Atlanta Georgia. We can only do one city and state at a time so we should talk about which one. 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
		'X-RapidAPI-Key': '395cc9c100mshac427d1df6a23e9p130807jsn016fa6b52c1c'
	}
};

// fetch('https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=Atlanta&state_code=GA&offset=0&limit=200&sort=relevance', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//abstraction and modularization

form.addEventListener("submit", function(event) {
    event.preventDefault();
    firstScreen.style.display = "none";
    mapCont.style.display="block";
	sidebar.style.display="block";
});

titleEl.addEventListener("click", function(event) {
    event.preventDefault();
	firstScreen.style.display="block"
    mapCont.style.display = "none";
	sidebar.style.display="none";
});

mapSwitchRealty.addEventListener("click", function() {
	trafficMap.style.display="none";
	realtyMap.style.display="block";
	mapSwitchRealty.style.display="none";
	mapSwitchTraffic.style.display="block";
	

})
mapSwitchTraffic.addEventListener("click", function() {
	trafficMap.style.display="block";
	realtyMap.style.display="none";
	mapSwitchRealty.style.display="block";
	mapSwitchTraffic.style.display="none";
	

})

// const mymap = L.map('map2').setView([0, 0], 6);
var accessToken = "pk.eyJ1IjoibGF1cmFhbnR1bmV6MDI0IiwiYSI6ImNsMjN0dmQ1bzF0a2szYnA2ZGJpNDJvd3YifQ.hLWsrVySzzKYd4I1ISkVMA"

var map = L.map('map2', {
    center: [33.74, -84.39],
    zoom: 13
});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGF1cmFhbnR1bmV6MDI0IiwiYSI6ImNsMjN0dmQ1bzF0a2szYnA2ZGJpNDJvd3YifQ.hLWsrVySzzKYd4I1ISkVMA'
}).addTo(map);

var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .openOn(map);

const api_url = 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=Atlanta&state_code=GA&offset=0&limit=200&sort=relevance&radius=10';

let firstTime = true;

async function getAddress() {
  const response = await fetch(api_url, options);
  
  const data = await response.json();
  console.log(data)
  var prop = data.properties[0]
  console.log(prop)
  var address = prop.address
  var lat = address.lat
  var lon = address.lon 
  var bed = prop.beds
  var bath = prop.baths
  var price = prop.price
  var street = address.line
  var area = address.neighborhood_name


//   Always set the view to current lat lon and zoom!
map.panTo(new L.LatLng(lat, lon));
popup.setLatLng([lat, lon]);
popup.setContent(street)


marker.setLatLng([lat, lon]);


  document.getElementById('county').textContent = area;
  document.getElementById('price').textContent = price;
  document.getElementById('bed').textContent = bed;
  document.getElementById('bath').textContent = bath;
}

getAddress();



// map.panTo(new L.LatLng(lat, lon));

// function handleFormSubmit(evt) {
//     evt.preventDefault();
//     var address = searchFormInput.value;
//     getStreetAddress(address);
// }

