## If we currently look our code we will notice that there is boilerplate that it's been repeated, in weatherAPI.js. It won't be great if we do not have to repeat ourselve?

```javascript
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

### 1. Create js/httpClient.js

```javascript
const ajax = (method, url, args) => (
    new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        let uri = url;
        let params;
        // TRIBUTE: https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
        if (method === 'POST') {
            params = typeof args == 'string' ? args : Object.keys(args).map(
                (k) => (encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
            ).join('&');
        }
        client.open(method, uri);
        if (method === 'POST') {
            client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        client.onload = (event) => {
            resolve(event.target.responseText);
        };
        client.onerror = (event) => {
            reject(event.target.statusText);
        };
        if (method === 'POST') {
            client.send(params);
        } else {
            client.send();
        }
    })
);

export const httpClient = {
    'get': (url, args) => ajax('GET', url, args),
    'post': (url, args) => ajax('POST', url, args),
};
```

### 2. Now we can use new service in weatherAPI.js

```diff
+import { httpClient } from './httpClient';
const apiKey = '855fb3867fa7108f3d6a43d7405878e6';

export const getCurrentWeather = (city) => {
-    let promise = new Promise((resolve, reject) => {
-    const uri = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
-    const client = new XMLHttpRequest();
-    client.onload = (event) => resolve(event.target.responseText);;
-    client.onerror = (event) => reject(event.target.statusText);
-    client.open('get', uri); // By default async
-    client.send();
-   });

-   return promise;
+    const uri = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
+    return httpClient.get(uri);
};

export const getForecastWeather = (city) => {
-   let promise = new Promise((resolve, reject) => {
-       const uri = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}`;
-       const client = new XMLHttpRequest();
-       client.onload = (event) => resolve(event.target.responseText);
-       client.onerror = (event) => reject(event.target.statusText);
-       client.open('get', uri); // By default async
-     client.send();
- });
+    const uri = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}`;
+    return httpClient.get(uri);
};
```

### 3. Because we are currently parsing the json in the new created service we have to make a little refactor on main.js

```diff
import { Drawer } from './Drawer';
import { Mapper } from './Mapper';
import * as weatherAPI from './weatherAPI';

- const handlerCurrentWeatherSuccess = (mapper, drawer) => (resultJSON) => {
+const handlerCurrentWeatherSuccess = (mapper, drawer) => (data) => {
-   const data = JSON.parse(resultJSON);
    const weatherSummaryEntities = mapper.currentWeather(data);
    drawer.drawWeather(weatherSummaryEntities);
};

- const handlerForecastWeatherSuccess = (mapper, drawer) => (resultJSON) => {
+const handlerForecastWeatherSuccess = (mapper, drawer) => (data) => {
-   const data = JSON.parse(resultJSON);
    const forecastSummaryEntities = mapper.forecastWeather(data);
    drawer.drawForecastResult(forecastSummaryEntities);
}

const forecastWeatherRequest = (city) => (
    weatherAPI.getForecastWeather(city)
);

const errorHandler = (err) => console.log(err);

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button-weather');
    const drawer = new Drawer('results');
    const mapper = new Mapper();

    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const cityInput = document.getElementById('input-city');
        if (cityInput.value) {
            Promise.all([
                weatherAPI.getCurrentWeather({ name: cityInput.value }),
                weatherAPI.getForecastWeather({ name: cityInput.value })
            ])
            .catch(errorHandler)
            .then((results) => {
                handlerCurrentWeatherSuccess(mapper, drawer)(results[0]);
                handlerForecastWeatherSuccess(mapper, drawer)(results[1]);
            });
        }
    });
});

```