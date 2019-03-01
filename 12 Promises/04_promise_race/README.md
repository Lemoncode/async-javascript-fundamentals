## In this demo we are going to use `Promise.race`. 

* This static method resolves a promise with the first fullfill promise of a set of promises.

## Steps

### 1. With this on place lets add the race condition to our code.

```diff main.js
import { Drawer } from './Drawer';
import { Mapper } from './Mapper';
import * as weatherAPI from './weatherAPI';

const handlerCurrentWeatherSuccess = (mapper, drawer) => (data) => {
    const weatherSummaryEntities = mapper.currentWeather(data);
    drawer.drawWeather(weatherSummaryEntities);
};

const handlerForecastWeatherSuccess = (mapper, drawer) => (data) => {
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
-           Promise.all([
-               weatherAPI.getCurrentWeather({ name: cityInput.value }),
-               weatherAPI.getForecastWeather({ name: cityInput.value })
-           ])
-           .catch(errorHandler)
-           .then((results) => {
-               handlerCurrentWeatherSuccess(mapper, drawer)(results[0]);
-               handlerForecastWeatherSuccess(mapper, drawer)(results[1]);
-           });
+            Promise.race([
+                weatherAPI.getCurrentWeather({ name: cityInput.value }),
+                weatherAPI.getForecastWeather({ name: cityInput.value })
+            ])
+            .catch(errorHandler)
+            .then((data) => {
+                if (JSON.parse(data).hasOwnProperty('weather')) {
+                    handlerCurrentWeatherSuccess(mapper, drawer)(data);
+                } else {
+                    handlerForecastWeatherSuccess(mapper, drawer)(data);
+                }
+            });
        }
    });
});


```
