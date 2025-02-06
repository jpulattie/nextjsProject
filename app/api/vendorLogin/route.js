
import { parseStringPromise } from 'xml2js';

export async function POST(req,res) {
    let response = res;
    let request = req;
    const vendorUser = process.env.vendorUser;
    const vendorPass = process.env.vendorPass;
    const url = process.env.CONNECTION_URL;
    let sessionId = process.env.sessionId;

    const call = `
    <query xmlns="http://www.corelationinc.com/queryLanguage/v1.0">
        <logon>
            <userName>${vendorUser}</userName>
            <deviceName>system</deviceName>
            <password>${vendorPass}</password>
        </logon>
    </query>
    `;

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

            const data = await parseStringPromise(xmlResponse, { explicitArray: false });
            sessionId = data.query?.logon?.sessionId;
            
            return new Response(JSON.stringify({ sessionId: sessionId }), {
                status:200,
                headers: {
                  'Content-Type': 'application/json'
          
                },
              });
          
        } else {
            console.error('Error with vendor login: ', response.statusText);
            return "error with vendor login"
        }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
        }



