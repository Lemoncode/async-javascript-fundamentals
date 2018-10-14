const createElement = (field, fieldValue, tag) => {
    const element = document.createElement(tag);
    element.innerHTML = `${field}: ${fieldValue}`;
    return element;
}

const createList = (entries) => {
    const ulElement = document.createElement('ul');
    entries.forEach((e) => {
        const liElement = document.createElement('li');
        liElement.innerHTML = e;
        ulElement.appendChild(liElement);
    });

    return ulElement;
}

const appendChildren = (node, ...children) => {
    children.forEach((c) => node.appendChild(c));
}

export default class Printer {
    printHouses(houses, container) {
        houses.forEach(h => this.printHouse(h, container));
    }

    printHouse(house, container) {
        const node = document.createElement('div');
        const name = createElement('House name', house.name, 'h3');
        const words = createElement('Words', house.words, 'h4');
        appendChildren(node, name, words);
        document.getElementById(container).appendChild(node);
    }

    printCharacters(characters, container) {
        characters.forEach(c => this.printCharacter(c, container));
    }

    printCharacter(character, container) {
        const node = document.createElement('div');
        const name = createElement('Character name', character.name, 'h3');
        const born = createElement('Born', character.born, 'h4');
        const aliases = createList(character.aliases);
        appendChildren(node, name, born, aliases);
        document.getElementById(container).appendChild(node);
    }
}
