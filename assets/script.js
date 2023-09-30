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
                <h2>${cityName}   Date:${data.list[0].dt_txt.substring(0, 10)}</h2>
                <img style="width:50px; height:50px" src="${imageUrl}"/>
                <li>Temperature: ${data.list[0].main.temp} </li>
                <li>Wind Speed: ${data.list[0].wind.speed}</li>
                <li>Humidity: ${data.list[0].main.humidity}</li>
              `
            
             // when button is clicked future weather conditions are displayed in row
            // city name, date, icon or weather, temp, humidty, wind speed, uv index
            for (let i = 7; i < data.list.length; i += 8) {

                let imageUrl2 = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"

                document.getElementById('card').innerHTML +=
                    `<h4>Date: ${data.list[i].dt_txt.substring(0, 10)}</h4>
                    <img style="width:50px; height:50px" src="${imageUrl2}"/>
                    <li>Temp: ${data.list[i].main.temp}</li>
                    <li>WindSpeed: ${data.list[i].wind.speed}</li>
                    <li>Humidity: ${data.list[i].main.humidity}</li>
                    `
        }
        });

        // save searched data in local storage
        localStorage.setItem(cityName, data);

        function searchHistory(){
            var recentSearch = [];
            recentSearch.push($('#search').val());

            $.each(recentSearch, function(index, value){
                document.getElementById('pastCities').innerHTML =
                `
                <button>${}
                `
                var list = document.createElement("p");
                p.innerHTML = value;
                document.getElementById('pastCities').appendChild(p);
            })
        }
        
        
    })
     .catch(function (error) {
        alert('ERROR');
      });
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

    // when button is clicked city searched is added to search history


    // when searched city is clicked under search history
    // then logged city presents current and future condtions again


