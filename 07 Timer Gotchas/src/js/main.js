(() => {
    let repitions = 0;
    const totalRepetions = 1000;
    const requestDelay = 10;
    let totalDelay = 0;

    const testDelay = () => {
        if (repitions++ > totalRepetions) {
            const avarage = totalDelay / totalRepetions;
            alert(`
                Request delay: ${requestDelay},
                Avarage delay: ${avarage}
            `);
            return;
        }

        const start = new Date();
        setTimeout(() => {
            const delay = new Date() - start;
            totalDelay += delay;
            testDelay();
        }, requestDelay);
    };

    testDelay();
})();
