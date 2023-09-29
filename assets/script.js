// create api variable
var apiKey = "b955c661c8b5cf8dc50a8ba80ffd4d98";
var cityName;

// create weather app function

    // create fetch to pull cities in from api
    function getApi(queryURL) {
     fetch(queryURL, {
         method: 'GET'
        })
        
     .then(function (response) {
        if (response.ok) {
            console.log(response);
        } else {
            console.log(status);
        }
        return response.json();
     })
     .then(function(data) {
        console.log(data)
     })
     .catch(function (error) {
        alert('ERROR');
      });
    }
    
    // create search bar that cities can be typed in to
    // allow for search button to be clicked 
    
    $('.btn').on('click', function() {
        
        event.preventDefault();
        cityName = document.getElementById('search').value;
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        getApi(queryURL);
        console.log("He's ALIVE!");
    })

    // when button is clicked current weather condiontions are displayed
    // when presented with searched city display:
    // city name, date, icon or weather, temp, humidty, wind speed, uv index


    // when button is clicked future weather consions are displayed in row
    // city name, date, icon or weather, temp, humidty, wind speed, uv index


    // when button is clicked city searched is added to search history


    // when searched city is clicked under search history
    // then logged city presents current and future condtions again


