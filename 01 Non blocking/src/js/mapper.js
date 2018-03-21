var mapper = mapper || {};

((mapper) => {
    mapper.apiMapper = () => {
        const housesMap = (houses) => (
            houses.map(h => ({
                name: h.name,
                words: h.words,
                region: h.region,
                coatOfArms: h.coatOfArms
            }))
        );

        const charactersMap = (characters) => (
            characters.map(c => ({
                name: c.name,
                born: c.born,
                aliases: [...c.aliases]
            }))
        );
        
        return {
            housesMap,
            charactersMap
        }
    };
})(mapper)
