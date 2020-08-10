import { validateName } from './CheckName'
//API Geonames
const URLGeonames = "http://api.geonames.org/searchJSON?q=";
const APIGeoname = "&username=mohammedd";
//API weatherbit
const URLweatherbit = "https://api.weatherbit.io/v2.0/forecast/daily?city=";
const APIweatherbit = "3be9fd2c075d4e9d9daf8b102d40298b";
//API pixabay
const URLpixabay = "https://pixabay.com/api/?key=";
const APIpixabay = "17449834-e2f1d59b99b4e7c7251a3fbdd&q="

//the User can't choose yesterday date
let today = new Date().toISOString().split('T')[0];
document.getElementsByName("DepartureDate")[0].setAttribute('min', today);
document.getElementsByName("ReturnDate")[0].setAttribute('min', today);

//To hide the card befor submit 
const card = document.getElementById("entryHolder")
card.style.display = 'none';

const generateButton = document.getElementById('generate');
const btnDelete = document.getElementById('btnDelete');
const print = document.getElementById('print');

//Event to add data
document.addEventListener('DOMContentLoaded', () => {
  generateButton.addEventListener('click', action);
});
//Event to delete data
document.addEventListener('DOMContentLoaded', () => {
  btnDelete.addEventListener('click', deleteData);
});
//Event to print the data
document.addEventListener('DOMContentLoaded', () => {
  print.addEventListener('click', printTheTrip);
})

//funtion to PRINT the trip
function printTheTrip() {
  window.print();
}
//function TO Delete the data
function deleteData() {
  document.getElementById('country').innerHTML = ""
  document.getElementById('city').innerHTML = ""
  document.getElementById('status').innerHTML = ""
  document.getElementById('temperature').innerHTML = ""
  document.getElementById('card-img').setAttribute('src', "")
  const card = document.getElementById("entryHolder")
  card.style.display = 'none';
}

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//add Event for button
function action() {
  event.preventDefault()
  deleteData()
  if (validateName()) {
    return
  } else {
    const cityName = document.getElementById("cityName").value;
    getWeather(URLweatherbit + cityName + "&key=" + APIweatherbit)
      .then(function (dataweather) {
        getImage(URLpixabay + APIpixabay + cityName + '&image_type=photo')
          .then(function (image) {

            getData(URLGeonames + cityName + APIGeoname)
              .then(function (data) {
                postData('http://localhost:8080/add', {
                  country: data.geonames[0].countryName,
                  city: dataweather.city_name,
                  status: dataweather.data[0].weather.description,
                  temperature: dataweather.data[0].temp,
                  'Image': image
                })
                updata(image);
              })
          })
      })
  }
}
//GET function 
async function getData(url = '') {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.log("error", error);
  };
};

//GET weather
async function getWeather(url = '') {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.log("error", error);
  };
};

//GET image
async function getImage(url) {
  const response = await fetch(url);
  try {
    const data = await response.json();
    const image = data.hits[0].webformatURL;
    return image;
  }
  catch (error) {
    console.log("error", error);
  };
}

//Post function
async function postData(url = '', data = {}) {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

//Updata UI 
async function updata(url) {
  const req = await fetch('http://localhost:8080/all');
  // const departureDate = document.getElementById("departure").value;
  // const returnDate = document.getElementById("return").value;
  try {
    const alldata = await req.json();
    document.getElementById('country').innerHTML = "Country: " + alldata.country
    document.getElementById('city').innerHTML = "City: " + alldata.city;
    document.getElementById('status').innerHTML = "Status: " + alldata.status
    document.getElementById('temperature').innerHTML = "Temperature: " + alldata.temperature
    document.getElementById('card-img').setAttribute('src', url)
    console.log(alldata);
    card.style.display = 'block';
  } catch (error) {
    console.log('error', error);
  };
};

export { action}
