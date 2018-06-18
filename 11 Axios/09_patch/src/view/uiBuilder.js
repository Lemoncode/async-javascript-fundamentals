export const createList = (elements) => {
    let list = document.createElement('ul');

    elements.forEach((element) => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(element)); // Use mapper here, to extract and format data.
        list.appendChild(listItem);
    });
    return list;
};

export const appendElement = (target, item) => {
    document.getElementById(target).appendChild(item);
};

export const createTextEntry = (text) => {
    let textEntry = document.createElement('p');
    textEntry.appendChild(document.createTextNode(text));
    return textEntry;
};

export const createElement = (element) => {
    const div = document.createElement('div');

    for (const key in element) {
        if (element.hasOwnProperty(key) && key !== '_id' && key !== '__v') {
            const value = element[key];
            let p = document.createElement('p');
            p.appendChild(document.createTextNode(`${key}: ${value}`));
            div.appendChild(p);
        }
    }

    return div;
}

export const cleanElement = (target) => document.getElementById(target).innerHTML = '';