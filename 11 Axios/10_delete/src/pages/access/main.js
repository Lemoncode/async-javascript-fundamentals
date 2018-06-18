import * as accessAPI from '../../API/accessAPI';
import {createTextEntry, appendElement} from '../../view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonAccess = document.getElementById('button-access');
    buttonAccess.addEventListener('click', (event) => {
        event.stopPropagation();
        accessAPI.grantAccess()
            .then((result) => {
                const text = createTextEntry(result.data.message);
                appendElement('container', text);
            })
            .catch((err) => console.log(err));
    });
});