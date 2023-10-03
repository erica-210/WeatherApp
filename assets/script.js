// create api variable
var apiKey = "b955c661c8b5cf8dc50a8ba80ffd4d98";
var cityName;
var currentCity = document.querySelector('.current-city');
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
         // when presented with searched city display:
        // city name, date, icon or weather, temp, humidty, wind speed
        var imageUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"


        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

        fetch(url2)
        .then(response => response.json())
         .then(data => {
            console.log(data);

            document.getElementById('current-city').innerHTML =
                `
                <h2 style="text-transform: uppercase">${cityName}   <span style="color: #4267cea6">${data.list[0].dt_txt.substring(0, 10)}</span>
                <img style="width:50px; height:50px" src="${imageUrl}"/></h2>
                <li style="list-style:none; padding:10px; font-weight:bold">Temperature: ${data.list[0].main.temp} </li>
                <li style="list-style:none; padding:10px; font-weight:bold">Wind Speed: ${data.list[0].wind.speed}</li>
                <li style="list-style:none; padding:10px; font-weight:bold">Humidity: ${data.list[0].main.humidity}</li>
              `
            
             // when button is clicked future weather conditions are displayed in row
            // city name, date, icon or weather, temp, humidty, wind speed, uv index
            for (var i = 7; i < data.list.length; i += 8) {

                var imageUrl2 = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"

                document.getElementById('card').innerHTML +=
                    `<h4>Date: ${data.list[i].dt_txt.substring(0, 10)}
                    <img style="width:50px; height:50px" src="${imageUrl2}"/></h4>
                    <li>Temp: ${data.list[i].main.temp}</li>
                    <li>WindSpeed: ${data.list[i].wind.speed}</li>
                    <li>Humidity: ${data.list[i].main.humidity}</li>
                    `
                    var individualCards = document.querySelector("#card");
                    individualCards.setAttribute("style", "list-style:none; background-color:#4267cea6")
        }

        // save searched data in local storage
        
        localStorage.setItem(cityName, JSON.stringify(data));


        // when button is clicked city searched is added to search history
        // when searched city is clicked under search history
        // then logged city presents current and future condtions again
        var history = JSON.parse(localStorage.getItem(cityName));
        var historyList = document.getElementById('pastCities');

        function searchHistory(text) {
            document.getElementById('pastCities').innerHTML =
              `
                <button style="padding:10px; font-weight:bold; text-transform: uppercase; background-color:#4267cea6; width:100px; text-align:center">${cityName} </button>
              `

            for (i = 0; i < history.length; i++) {
               $(".pastCities").prepend("button type='button' class='btn btn-light prev-city'>" + history[i] + "</button>");
                //$(".pastCities").children('textarea').val(localStorage.getItem(history[i]));
                //var li = document.createElement('li')
                //li.textContent = text;
                //historyList.appendChild(li);
           }
        }
        console.log(history);
        searchHistory();
     })

     .catch(function (error) {
        alert('ERROR');
      });
     })
    }
    // create search bar that cities can be typed into
    // allow for search button to be clicked 
    $('.btn').on('click', function(event) {
        
        event.preventDefault();
        cityName = document.getElementById('search').value;
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        getApi(queryURL);
        console.log("He's ALIVE!");
    })



