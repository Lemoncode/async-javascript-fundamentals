export const forEach = (items, callback) => {
    for (const item of items) {
        // callback(item);
        setTimeout(() => {
            callback(item);
        }, 0);
    }
};
