document.onreadystatechange = () => {
    const load = () => {
        const search_button = document.getElementById('search_button');
        const service = new apiIceAndFire.Service();
        const printer = new printService.Printer();
        const apiMapper = mapper.apiMapper();

        search_button.addEventListener('click', (event) => {
            event.stopPropagation();
            const houseInput = document.getElementById('input-house');
            const characterInput = document.getElementById('input-character');

            if (houseInput.value && characterInput.value) {
                console.log('1');
              const charactersRequestConfig = {
                  err: handleError,
                  callback:handleCharactersRequestSuccess(apiMapper, printer),
                  charService: service,
                  charName: characterInput.value
              };
              const housesRequestConfig = {
                  err: handleError,
                  callback: handleHousesRequestSuccess(apiMapper, printer, getCharacters, charactersRequestConfig)
              };
              console.log('house call');
              service.getHousesByName(houseInput.value, housesRequestConfig);
              console.log('3');
            } else {
                alert('Introduce values')
            }
        });
    };

    function getCharacters (charactersRequestConfig) {
      //const service = new apiIceAndFire.Service();
      charactersRequestConfig.charService.getCharactersByName(charactersRequestConfig.charName, charactersRequestConfig);
      console.log('character Call');
    }

    function handleError() {
        console.log(JSON.parse(this.responseText));
    };

    function handleHousesRequestSuccess(apiMapper, printer, callback, charactersRequestConfig) {
        return function () {
            const data = JSON.parse(this.responseText);
            const houses = apiMapper.housesMap(data);
            printer.printHouses(houses, 'houses');
            if(callback){
              callback(charactersRequestConfig);
            }
        };
    };

    function handleCharactersRequestSuccess(apiMapper, printer) {
        return function () {
            const data = JSON.parse(this.responseText);
            const characters = apiMapper.caracthersMap(data);
            printer.printCharacters(characters, 'characters');
        };
    }

    if (document.readyState === 'complete') {
        load();
    }
};

