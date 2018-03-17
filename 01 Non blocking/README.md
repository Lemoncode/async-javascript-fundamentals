### To get the demo working:

name: Jaime Lannister
house: House Lannister of Casterly Rock

## En esta demo vamos a observar la naturaleza no bloqueante de JS.

* Hemos dicho, que sólo una cosa puede pasar por vez, pero el tiempo parece que se está cargando bastante rápido. Y no es sólo porque nuestro BW sea realmente bueno, si no que además existe otra razón. 

* Si miramos el código, esta razón no parece tan obvia. Después de lo que hemos dicho de JavaScript, podríamos pensar, que este trozo de JavaScript, que tenemos aquí en main.js, donde hacemos las peticiones:
    * Que hasta, que no termine esta: `service.getCurrentWeather(handlerError, handlerCurrentWeatherSuccess);`
    * No va a comenzar la siguiente: `service.getForecastWeather(handlerError, handlerForecastWeatherSuccess);`

* Pero si hemos trabajado con callbacks, estaremos familirizados con el hecho de que los callbacks nos permiten, iniciar una petición y después seguir con el resto de la ejecución del programa. 

* Por ejemplo, haciendo otra petición. Cuando las peticiones estan completadas sus respectivos callbacks serán llamados. Pero cómo es esto posible, si sólo una cosa se puede ejecutar por vez, ¿cómo podemos hacer dos peticiones web de manera concurrente?

* Abrimos debugger (F12). Abrimos network, NOTA: `XHR Breakpoints desactivado así como Async checkbox.` 
 
* Aquí podemos ver como las dos peticiones son arrancadas en paralelo por parte del browser. 
    * NOTA: Utilizar el zoom de Chrome, para que se vea mejor.

* Volvemos a repetir, ¿cómo es esto posible? Si sólo podemos hacer una cosa por vez, ¿no deberíamos de obtener una petición antes que la otra? Mientras que el motor de JavaScript sólo ejecutará una pieza de código cada vez, detrás de bambalinas, existe un pool the threads que son usados para cosas como hacer web requests. Y éste pool de threads pueden tener múltiples hebras abiertas contra múltiples servidores para solicitar el data para múltiples peticiones diferentes al mismo tiempo. Todo esto se desarrolla detrás de bambalinas, pero esta es la manera que tenemos para conseguir parelalismo (concurrencia) dentro de una aplicación JavaScript. Seguimos teniendo detrás de bambalinas, la habilidad para multithreading. 

* Lo que tenemos que apuntar fuera aquí, es la naturaleza no bloqueante de JavaScript. Hacemos una petición pero no esperamos, la respuesta y ya hacemos la siguiente, y tampoco esperamos la respuesta de esta. No estamos bloqueando para coger los resultados. Si bloquearemos, eso sería bastante malo ya que sólo podríamos ejecutar una cosa por vez.
