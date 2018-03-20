document.onreadystatechange = () => {

    const load = () => {
        const search_button = document.getElementById('search_button');

        search_button.addEventListener('click', (event) => {
            event.stopPropagation();
            const houseInput = document.getElementById('input-house');
            const characterInput = document.getElementById('input-character');
            
            if (houseInput.value && characterInput.value) {
                GetHousesAndCharacters(houseInput, characterInput);
            } else {
                alert('Introduce a values')
            }
        });
    };

    function GetHousesAndCharacters(houseInput, characterInput){
        const service = new apiIceAndFire.Service();
        const printer = new printService.Printer();
        const apiMapper = mapper.apiMapper();

        const charactersRequestConfig = {
            err: handleError,
            service:service,
            character: characterInput.value,
            callback: handleCharactersRequestSuccess(apiMapper, printer)
        };

        const housesRequestConfig = {
            err: handleError,
            service: service,
            house: houseInput.value,
            callback: handleHousesRequestSucces(apiMapper, printer, GetCharacters,charactersRequestConfig)
        };
        GetHouses(housesRequestConfig);
    }

    function GetHouses(housesRequestConfig){
        console.log('First: House');
        const srv = housesRequestConfig.service;
        const house = housesRequestConfig.house;

        srv.getHousesByName(house, housesRequestConfig);
    }

    function GetCharacters(charactersRequestConfig){
        const srv = charactersRequestConfig.service;
        const character = charactersRequestConfig.character;

        srv.getCharactersByName(character, charactersRequestConfig);        
    }

    function handleError() {
        console.log(JSON.parse(this.responseText));
    };

    function handleHousesRequestSucces(apiMapper, printer, callback, charactersRequestConfig) {
        return function () {
            const data = JSON.parse(this.responseText);
            const houses = apiMapper.housesMap(data);
            printer.printHouses(houses, 'houses');
            
            if(callback!== null){
                console.log('Second: Character');
                callback(charactersRequestConfig);
            }
        };
    };

    function handleCharactersRequestSuccess(apiMapper, printer) {
        return function () {
            const data = JSON.parse(this.responseText);
            const characters = apiMapper.caracthersMap(data);
            printer.printCharacters(characters, 'characters');
            console.log('All Requests completes');
        };
    }

    if (document.readyState === 'complete') {
        load();
    }
};
