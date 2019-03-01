# In this demo  we are going to create the weather API, using promises.

### 1. Add index.html and site.css

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

```css
@import url('https://fonts.googleapis.com/css?family=Raleway');

body {
  font-family: 'Raleway', sans-serif;
}

.container {
  padding: 2em;
}

.container p {
  max-width: 70%;
  font-size: 0.9em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  height: 2.3em;
}

.container p img {
  max-width: 95%;
  max-height: 95%;
  position: relative;
  top: 0.7em;
  left: 1em;
}

.container ul {
  list-style: none;
}

```

### 2. Create weatherAPI.js using promises.

```javascript
const apiKey = '855fb3867fa7108f3d6a43d7405878e6';

export const getCurrentWeather = (city) => (
    new Promise((res, rej) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
        const client = new XMLHttpRequest();
        client.onload = (event) => res(event.target.responseText);
        client.onerror = (event) => rej(event.target.statusText);
        client.open('get', url); 
        client.send();
    })
);

export const getForecastWeather = (city) => (
    new Promise((res, rej) => { // [1]
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}`;
        const client = new XMLHttpRequest();
        client.onload = (event) => res(event.target.responseText);
        client.onerror = (event) => rej(event.target.statusText);
        client.open('get', url); 
        client.send();
    })
);


```

1. When we build a promise, we pass a function that it's called `executor`.
    * This function it's feeded with `resolve` and `reject` as parameters.

### 3. Create Mapper.js to deal with weather API.

```javascript
export class Mapper {
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

    createImageNode = (icon) => {
        const el = document.createElement('img');
        el.src = `http://openweathermap.org/img/w/${icon}.png`;
        return el;
    }

    weatherNodeFromWeatherEntity = (htmlTag) => ({ main, description, icon }) => {
        const node = document.createElement(htmlTag);
        const textNode = document.createTextNode(`Expected: ${main}, Description: ${description}`);
        const nodeImage = this.createImageNode(icon);
        node.appendChild(textNode);
        node.appendChild(nodeImage);
        return node;
    };

    drawWeather(weatherSummaryEntities) {
        if (weatherSummaryEntities.length > 0) {
            const weatherNodeParragraph = this.weatherNodeFromWeatherEntity('p');
            const nodes = weatherSummaryEntities.map(weatherNodeParragraph)
            nodes.forEach((n) => {
                document.getElementById(this.container).appendChild(n);
            })
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

                const weatherNodeParragraph = this.weatherNodeFromWeatherEntity('p');
                element.weather.forEach((element) => {
                    liNode.appendChild(
                        weatherNodeParragraph(element)
                    );
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

### 6. Although we're using parcel with ES6 we will need extra configuration to get support for class properties

```bash
$ npm i parcel @babel/preset-env @babel/plugin-proposal-class-properties -D
```

* Add _.babelrc_ file to the root folder

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

### 7. To run the application

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