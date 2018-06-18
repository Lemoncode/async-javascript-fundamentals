## In this demo we are going to use the static method `Promise.all`

* NOTE: We start from the previous demo code.

### 1. Let's change main.js to achieve this goal.

```diff main.js
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
-           weatherAPI.getCurrentWeather({ name: cityInput.value })
-               .then((resultJSON) => {
-                   handlerCurrentWeatherSuccess(mapper, drawer)(resultJSON);
-                   return forecastWeatherRequest({ name: cityInput.value });
-               })
-               .then(handlerForecastWeatherSuccess(mapper, drawer))
-               .catch(errorHandler);
+            Promise.all([
+                weatherAPI.getCurrentWeather({ name: cityInput.value }),
+                weatherAPI.getForecastWeather({ name: cityInput.value })
+            ])
+            .catch(errorHandler)
+            .then((results) => {
+                handlerCurrentWeatherSuccess(mapper, drawer)(results[0]);
+                handlerForecastWeatherSuccess(mapper, drawer)(results[1]);
+            });
        }
    });
});


```
* `Promise.all`, allows us to resolve in parallel multiple async operations.
* The resolve value of the promises goes on the same order on results array.
* Notice, that the catch statement can be in any place on the chain.
