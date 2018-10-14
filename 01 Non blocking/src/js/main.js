import Service from './apiIceAndFire';
import Printer from './printService';
import {
    caracthersMap,
    housesMap, 
} from './mapper';

document.onreadystatechange = () => {
    const load = () => {
        const search_button = document.getElementById('search_button');
        const service = new Service();
        const printer = new Printer();

        search_button.addEventListener('click', (event) => {
            event.stopPropagation();
            const houseInput = document.getElementById('input-house');
            const characterInput = document.getElementById('input-character');
            
            if (houseInput.value && characterInput.value) {
                console.log('1');
                const housesRequestConfig = {
                    err: handleError,
                    callback: handleHousesRequestSucces(housesMap, printer)
                };
                service.getHousesByName(houseInput.value, housesRequestConfig);
                console.log('2');
                const charactersRequestConfig = {
                    err: handleError,
                    callback: handleCharactersRequestSuccess(caracthersMap, printer)
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

    function handleHousesRequestSucces(housesMap, printer) {
        return function () {
            const data = JSON.parse(this.responseText);
            const houses = housesMap(data);
            printer.printHouses(houses, 'houses');
        };
    };

    function handleCharactersRequestSuccess(caracthersMap, printer) {
        return function () {
            const data = JSON.parse(this.responseText);
            const characters = caracthersMap(data);
            printer.printCharacters(characters, 'characters');
        };
    }

    if (document.readyState === 'complete') {
        load();
    }
};
