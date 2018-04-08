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
                    service: service,
                    input: characterInput.value,
                    callback: handleCharactersRequestSuccess(apiMapper, printer)
                };
                const housesRequestConfig = {
                    err: handleError,
                    callback: handleHousesRequestSucces(apiMapper, printer, charactersRequestConfig)
                };
                service.getHousesByName(houseInput.value, housesRequestConfig);
                console.log('2');
            } else {
                alert('Introduce a values')
            }
        });
    };

    function handleError() {
        console.log(JSON.parse(this.responseText));
    };

    function handleHousesRequestSucces(apiMapper, printer, {err, service, input, callback}) {
        return function () {
            const data = JSON.parse(this.responseText);
            const houses = apiMapper.housesMap(data);
            printer.printHouses(houses, 'houses');
            service.getCharactersByName(input, {err,callback});
            console.log('3');
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
