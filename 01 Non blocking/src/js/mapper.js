export const housesMap = (houses) => (
    houses.map(h => ({
        name: h.name,
        words: h.words,
        region: h.region,
        coatOfArms: h.coatOfArms
    }))
);

export const caracthersMap = (characters) => (
    characters.map(c => ({
        name: c.name,
        born: c.born,
        aliases: [...c.aliases]
    }))
);