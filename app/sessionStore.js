
export let sessionData = {
    sessionId: null,
    loginSerial: null,
    personSerial: null,
    personFirstName: null,
    personLastName: null,
    accounts: null
};

export function setSessionData(data) {
    return sessionData = {...sessionData, ...data }
};

