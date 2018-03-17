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
                const housesRequestConfig = {
                    err: handleError,
                    callback: handleHousesRequestSucces(apiMapper, printer)
                };
                service.getHousesByName(houseInput.value, housesRequestConfig);
                console.log('2');
                const charactersRequestConfig = {
                    err: handleError,
                    callback: handleCharactersRequestSuccess(apiMapper, printer)
                };
                service.getCharactersByName(characterInput.value, charactersRequestConfig);
                console.log('3');
            } else {
                alert('Introduce a values')
            }
        });
    };

    function handleError() {
        console.log(JSON.parse(this.responseText));
    };

    function handleHousesRequestSucces(apiMapper, printer) {
        return function () {
            const data = JSON.parse(this.responseText);
            const houses = apiMapper.housesMap(data);
            printer.printHouses(houses, 'houses');
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
