
import { parseStringPromise } from 'xml2js';

export default async function handler(req,res) {
    const vendorUser = process.env.vendorUser
    const vendorPass = process.env.vendorPass
    const url = process.env.CONNECTION_URL
    let sessionId = process.env.sessionId

    const call = `
    <query xmlns="http://www.corelationinc.com/queryLanguage/v1.0">
        <logon>
            <userName>${vendorUser}</userName>
            <deviceName>system</deviceName>
            <password>${vendorPass}</password>
        </logon>
    </query>
    `;
    console.log('here2', call)

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: call,
                headers: {
                'Content-Type':'application/xml',
                }
            });
        if (response.ok) {
            const xmlResponse = await response.text(); // Get the XML response as text
            console.log('Raw XML response:', xmlResponse);

            // Convert XML to JSON
            const data = await parseStringPromise(xmlResponse, { explicitArray: false });
            console.log('Parsed JSON response:', data);
            sessionId = data.query?.logon?.sessionId;
            console.log('session id:',sessionId)
            return sessionId
            //response.status(200).json(data)
        } else {
            console.error('Error with vendor login: ', response.statusText);
            //response.status(response.status).json({error: response.statusText});
        }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
        }



