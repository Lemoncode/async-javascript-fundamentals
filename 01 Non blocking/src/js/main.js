document.onreadystatechange = () => {
  const load = () => {
    const search_button = document.getElementById("search_button");
    const service = new apiIceAndFire.Service();
    const printer = new printService.Printer();
    const apiMapper = mapper.apiMapper();

    search_button.addEventListener("click", event => {
      event.stopPropagation();
      const houseInput = document.getElementById("input-house");
      const characterInput = document.getElementById("input-character");

      if (houseInput.value && characterInput.value) {
        console.log("1: we have house and character inputs value.");
        const housesRequestConfig = {
          err: handleError,
          callback: handleHousesRequestSucces(service, apiMapper, printer, characterInput.value)
        };
        service.getHousesByName(houseInput.value, housesRequestConfig);
        console.log("2: called getHousesByName");
      } else {
        alert("Introduce a values");
      }
    });
  };

  function handleError() {
    console.log(JSON.parse(this.responseText));
  }

  function handleHousesRequestSucces(service, apiMapper, printer, characterInputValue) {
    return function() {
      mapAndPrintHouses(apiMapper, printer, this.responseText);
      callCharacters(service, apiMapper, printer, characterInputValue);
    };
  }

  function handleCharactersRequestSuccess(apiMapper, printer) {
    return function() {
      const data = JSON.parse(this.responseText);
      const characters = apiMapper.caracthersMap(data);
      printer.printCharacters(characters, "characters");
    };
  }

  function mapAndPrintHouses(apiMapper, printer, serializeHouses) {
    const data = JSON.parse(serializeHouses);
    const houses = apiMapper.housesMap(data);
    printer.printHouses(houses, "houses");
  }

  function callCharacters(service, apiMapper, printer, characterInputValue){
    const charactersRequestConfig = {
        err: handleError,
        callback: handleCharactersRequestSuccess(apiMapper, printer)
    };
    service.getCharactersByName(characterInputValue,charactersRequestConfig);
    console.log("3: called getCharactersByName");
  }

  if (document.readyState === "complete") {
    load();
  }
};
