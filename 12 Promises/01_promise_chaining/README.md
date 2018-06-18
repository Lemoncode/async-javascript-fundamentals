## In this demo we are going to demonstrate how to chain promises using `then`

* NOTE: We start from the previous demo code.

### 1. To achieve our goal we have to modify the `main.js` so we sync the requests. 

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

+const forecastWeatherRequest = (city) => (
+    weatherAPI.getForecastWeather(city)
+); 

const errorHandler = (err) => console.log(err); 

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button-weather');
    const drawer = new Drawer('results');
    const mapper = new Mapper();

    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const cityInput = document.getElementById('input-city');
        if (cityInput.value) {
-       weatherAPI.getCurrentWeather({ name: cityInput.value })
-           .then(handlerCurrentWeatherSuccess(mapper, drawer))
-           .catch(errorHandler);
-
-       weatherAPI.getForecastWeather({ name: cityInput.value })
-           .then(handlerForecastWeatherSuccess(mapper, drawer))
-           .catch(errorHandler);
+           weatherAPI.getCurrentWeather({ name: cityInput.value })
+               .then((resultJSON) => {
+                   handlerCurrentWeatherSuccess(mapper, drawer)(resultJSON);
+                   return forecastWeatherRequest({ name: cityInput.value });
+               })
+               .then(handlerForecastWeatherSuccess(mapper, drawer))
+               .catch(errorHandler);
        }
    });
});

```
* Notice that from a then statemnet we can return a new promise, that will be handle in the next then on the chain. 
