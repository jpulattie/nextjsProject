import { parseStringPromise } from 'xml2js';


export default async function handler(req ,res) {
    //const request = await req.headers.get('Content-Type');
    console.log('request:', req.body)
    
    //const data = await req.json()
    //console.log('request to end user login from page.js:', data)
    const { userName, userPassword, sessionId } = req.body;
    const url = process.env.CONNECTION_URL;
    let sessionStatus = '';

    const call = `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0"
    sessionId="${sessionId}">
    <sequence>
      <transaction>
      <step>
        <loginVerify>
        <loginId>${userName}</loginId>
        <password>${userPassword}</password>
        </loginVerify>
      </step>
      </transaction>
    </sequence>
    </query>
    `;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: call,
                headers: {
                'Content-Type':'application/xml',
                }});
        if (response.ok) {
            const data = await response.text();
            console.log('Raw XML end user login response:', request.body)

        } else {
            console.error('Error with vendor login: ', response.statusText);
        }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
            
        }
