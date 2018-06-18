# In this demo  we are going to create the weather API, using promises.

### 1. Add index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./src/content/site.css">
    <title>API weather</title>
</head>

<body>
    <h1>API Rest</h1>
    <button id="button-weather">Get weather</button>
    <input id="input-city" type="text" placeholder="write city" />
    <div class="container" id="results"></div>
    <script src="./src/js/main.js"></script>
</body>

</html>
```

### 2. Create weatherAPI.js using promises.

```javascript
const apiKey = '855fb3867fa7108f3d6a43d7405878e6';

export const getCurrentWeather = (city) => {
    let promise = new Promise((resolve, reject) => {
        const uri = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
        const client = new XMLHttpRequest();
        client.onload = (event) => resolve(event.target.responseText);;
        client.onerror = (event) => reject(event.target.statusText);
        client.open('get', uri); // By default async
        client.send();
    });

    return promise;
};

export const getForecastWeather = (city) => {
    let promise = new Promise((resolve, reject) => {
        const uri = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}`;
        const client = new XMLHttpRequest();
        client.onload = (event) => resolve(event.target.responseText);
        client.onerror = (event) => reject(event.target.statusText);
        client.open('get', uri); // By default async
        client.send();
    });

    return promise;
};
```

* When we build a promise, we pass a function that it's called `executor`.
* This function it's feeded with `resolve` and `reject` as parameters.

### 3. Create Mapper.js to deal with weather API.

```javascript
export class ApiWeatherMapper {
    currentWeather(data) {
        return data.weather.map((element) => ({
            description: element.description,
            icon: element.icon,
            main: element.main
        }));
    }

    forecastWeather(data) {
        return data.list.map((element) => ({
            date: element.dt_txt.split(' ')[0],
            time: element.dt_txt.split(' ')[1],
            weather: element.weather
        }));
    }
}

```

### 4. Create Drawer.js

```javascript
export class Drawer {
    constructor(container) {
        this.container = container;
    }

    drawWeather(weatherSummaryEntities) {
        if (weatherSummaryEntities.length > 0) {
            weatherSummaryEntities.forEach((element) => {
                let node = document.createElement("p");
                const textNode = document.createTextNode(`Expected: ${element.main}, Description: ${element.description}`);
                let nodeImage = document.createElement("img");
                nodeImage.src = `http://openweathermap.org/img/w/${element.icon}.png`;
                node.appendChild(textNode);
                node.appendChild(nodeImage);
                document.getElementById(this.container).appendChild(node);
            });
        }
    }

    drawForecastResult(results) {
        if (results.length > 0) {
            let node = document.createElement("ul");
            results.forEach((element) => {

                let liNode = document.createElement("li");
                let mainP = document.createElement("p");
                const mainPText = document.createTextNode(`Date: ${element.date} Time: ${element.time}`);
                mainP.appendChild(mainPText);
                liNode.appendChild(mainP);

                element.weather.forEach((element) => {
                    let detailP = document.createElement("p");
                    const detailPText = document.createTextNode(`Expected: ${element.main}, ${element.description}`);
                    let nodeImage = document.createElement("img");
                    nodeImage.src = `http://openweathermap.org/img/w/${element.icon}.png`;
                    detailP.appendChild(detailPText);
                    detailP.appendChild(nodeImage);
                    liNode.appendChild(detailP);
                });

                node.appendChild(liNode);
            });
            document.getElementById(this.container).appendChild(node);
        }
    }
}

```

### 5. Now it's time to create main.js

```javascript
import { Drawer } from './Drawer';
import { Mapper } from './Mapper';
import * as weatherAPI from './weatherAPI';

const handlerCurrentWeatherSuccess = (mapper, drawer) => (resultJSON) => {
    const data = JSON.parse(resultJSON);
    const weatherSummaryEntities = mapper.currentWeather(data);
    drawer.drawWeather(weatherSummaryEntities);
};

const handlerForecastWeatherSuccess = (mapper, drawer) => (resultJSON) => {
    const data = JSON.parse(resultJSON);
    const forecastSummaryEntities = mapper.forecastWeather(data);
    drawer.drawForecastResult(forecastSummaryEntities);
}

const errorHandler = (err) => console.log(err); 

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button-weather');
    const drawer = new Drawer('results');
    const mapper = new Mapper();

    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const cityInput = document.getElementById('input-city');
        if (cityInput.value) {
            weatherAPI.getCurrentWeather({ name: cityInput.value })
                .then(handlerCurrentWeatherSuccess(mapper, drawer))
                .catch(errorHandler);

            weatherAPI.getForecastWeather({ name: cityInput.value })
                .then(handlerForecastWeatherSuccess(mapper, drawer))
                .catch(errorHandler);
        }
    });
});

```

### 6. To run the application

```diff package.json
{
  "name": "promises_demo",
  "version": "1.0.0",
  "description": "Promises ES6",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+    "start": "parcel index.html"
  },
  "keywords": [
    "Promises",
    "ES6"
  ],
  "author": "Jaime Salas",
  "license": "MIT",
  "dependencies": {
    "parcel": "^1.8.1"
  }
}

```