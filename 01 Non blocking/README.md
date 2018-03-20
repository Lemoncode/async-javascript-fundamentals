## In order to get the code working:

* Open terminal at the same level as `package.json`, and type:
```bash
$ npm install
```
* After installation, we can run the application using:
```bash
$ npm start
```
* To get results on the open browser app:
    * house: `House Lannister of Casterly Rock`
    * character input: `Jaime Lannister`

## In this demo we are going to study the non blocking nature of JavaScript

* Just one thing can happen at a time in JavaScript. But the required time to get data loaded is really short. This is not just because good network capabilities. There is another reason.

* Looking into the code, this reason doesn't seem so obvious. We could think, by looking at `main.js` code, that:
    * While this request `service.getHousesByName(houseInput.value, housesRequestConfig);` does not end...
    * This one `service.getCharactersByName(characterInput.value, charactersRequestConfig);` is not going to start

* If we have been already working with callbacks, we are used to initialize a request and then proceed with the execution.

* But if just one thing at a time is executed, how is this possible?

* Inside Chrome developer tools, on the network tab, we can notice that the requests are being sent concurrently.

