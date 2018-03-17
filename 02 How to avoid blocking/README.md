## En esta demo vamos a ver como establecer la naturaleza no bloqueante de JS

## Steps.

### 1. Open `src/js/apiWeather.js`

```diff
var apiWeather = apiWeather || {};

(function (apiWeather) {
  apiWeather.Service = class Service {
    constructor(apiKey = '855fb3867fa7108f3d6a43d7405878e6') {
      this.apiKey = apiKey;
      this.city = null;
    }

    setCity(city) {
      this.city = city; // obj:{ name: string, id: int}
    }

    getCurrentWeather(err, callback) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${this.apiKey}`;
      const req = new XMLHttpRequest();
-      req.open('get', url, true);
+      req.open('get', url, false);
      req.send();
      req.onload = callback;
      req.onerror = err;
    }

    getForecastWeather(err, callback) {
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city.name}&appid=${this.apiKey}`;
      const req = new XMLHttpRequest();
      req.onload = callback;
      req.onerror = err;
-      req.open('get', url, true);
+      req.open('get', url, false);
      req.send();
    }
  }

})(apiWeather);

```

* De esta manera XHR, funciona de manera síncrona.
* Mirar los console logs para ver en que orden se ejecutan las cosas. 

### 2. Now if we change these values again we can watch that goes on parallel

```diff apiWeather.js
var apiWeather = apiWeather || {};

(function (apiWeather) {
  apiWeather.Service = class Service {
    constructor(apiKey = '855fb3867fa7108f3d6a43d7405878e6') {
      this.apiKey = apiKey;
      this.city = null;
    }

    setCity(city) {
      this.city = city; // obj:{ name: string, id: int}
    }

    getCurrentWeather(err, callback) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${this.apiKey}`;
      const req = new XMLHttpRequest();
+      req.open('get', url, true);
-      req.open('get', url, false);
      req.send();
      req.onload = callback;
      req.onerror = err;
    }

    getForecastWeather(err, callback) {
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city.name}&appid=${this.apiKey}`;
      const req = new XMLHttpRequest();
      req.onload = callback;
      req.onerror = err;
+      req.open('get', url, true);
-      req.open('get', url, false);
      req.send();
    }
  }

})(apiWeather);

```
* Open and show results on developer tools.
