document.onreadystatechange = () => {
    const load = () => {
        const search_button = document.getElementById('search_button');

        search_button.addEventListener('click', (event) => {
            event.stopPropagation();
            const houseInput = document.getElementById('input-house');
            const characterInput = document.getElementById('input-character');
            
            if (houseInput.value && characterInput.value) {
                getHouseBeforeCharacter(houseInput.value, characterInput.value);
            } else {
                alert('Introduce a values')
            }
        });
    };

    const service = new apiIceAndFire.Service();
    const printer = new printService.Printer();
    const apiMapper = mapper.apiMapper();

    function getCharacter(character) {
        const charactersRequestConfig = {
            err: handleError,
            callback: handleCharactersRequestSuccess(apiMapper, printer)
        };
        service.getCharactersByName(character, charactersRequestConfig);
    }

    function getHouseBeforeCharacter(house, character) {
        const housesRequestConfig = {
            err: handleError,
            callback: handleHousesRequestSuccess(apiMapper, printer, character)
        };
        service.getHousesByName(house, housesRequestConfig);
    }

    function handleError() {
        console.log(JSON.parse(this.responseText));
    };

    function handleHousesRequestSuccess(apiMapper, printer, character) {
        return function () {
            const data = JSON.parse(this.responseText);
            const houses = apiMapper.housesMap(data);
            printer.printHouses(houses, 'houses');
            getCharacter(character);
        };
    };

    function handleCharactersRequestSuccess(apiMapper, printer) {
        return function () {
            const data = JSON.parse(this.responseText);
            const characters = apiMapper.charactersMap(data);
            printer.printCharacters(characters, 'characters');
        };
    }

    if (document.readyState === 'complete') {
        load();
    }
};
