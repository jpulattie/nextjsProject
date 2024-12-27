export default function Call(apiCall) {
    const call = apiCall
    const connection = process.env.CONNECTION_URL
    const settings = {
        method: 'POST',
        body: call,
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    }

    const response = await fetch(connection, settings);
    if (response.status === 200)

}