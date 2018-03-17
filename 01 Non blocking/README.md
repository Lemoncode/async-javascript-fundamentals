## In order to get the code working:

* Open terminal at the same level as `package.json`, and type:
```bash
$ npm install
```
* After installation, we can run the application using:
```bash
$ npm install
```
* To get results on the open browser app:
    * house: `House Lannister of Casterly Rock`
    * character input: `Jaime Lannister`

## In this demo we are going to study the non blocking nature of JavaScript

* Just one thing can happen per time in JavaScript. But the required time to get data loaded is really short. Is not just to have a really good network capabilities, there is another reason.

* Looking into the code this reason is not so obviously.We can think looking the `main.js` code that:
    * While this request `service.getHousesByName(houseInput.value, housesRequestConfig);` does not end...
    * This one `service.getCharactersByName(characterInput.value, charactersRequestConfig);` is not going to start

* If we already have been working with callbacks, we are use to initialize a request and then proceed with the execution.

* But if just one thing per time it's executed, how is this possible?

* Opening the developer tools on Chrome, open the network tab. Here  we can watch that the requests are sending concurrently.
