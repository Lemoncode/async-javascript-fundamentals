const mockAccess = {
    min: 1,
    max: 5,
    allowedValue: 3,
    forbiddenStatus: 403,
    notAllowedStatus: 405,
};

const mapStatuses = new Map([
    [mockAccess.forbiddenStatus, { message: 'Request rejected' }],
    [mockAccess.notAllowedStatus, { message: 'User without priviliges' }],
    [mockAccess.allowedValue, { message: 'Granted access' }]
]);

const resolveStatusValue = (number) => {
    let statusValue;
    if(number > mockAccess.allowedValue) {
        statusValue = mockAccess.forbiddenStatus;
    } else if (number < mockAccess.allowedValue) {
        statusValue = mockAccess.notAllowedStatus;
    } else {
        statusValue = mockAccess.allowedValue;
    }
    return statusValue;
};

module.exports = {
    resolveAccess: (getNumber) => (res) => {
        const statusValue = resolveStatusValue(
            getNumber(mockAccess.min, mockAccess.max)
        );
        res.send(
            mapStatuses.get(statusValue)
        ); 
    }
};
