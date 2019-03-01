export const submitButtonPromise = (event, targetId) => (
    new Promise((resolve, _) => {
        document.getElementById(targetId)
            .addEventListener(event, (evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                resolve();
            });
    })
); 