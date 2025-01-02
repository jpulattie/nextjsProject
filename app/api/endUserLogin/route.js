import { parseStringPromise } from 'xml2js';


export async function POST(req ,res) {
    //const request = await req.headers.get('Content-Type');

    
    //const data = await req.json()
    //console.log('request to end user login from page.js:', data)
    let { userName, userPassword, sessionId } = req.body;
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
            console.log('username: '+ userName + ' password: '+ userPassword + ' sessionId: ' + sessionId);
            const response = await fetch(url, {
                method: 'POST',
                body: call,
                headers: {
                'Content-Type':'application/xml',
                }});
        if (response.ok) {
            //const data = await response.text();
            //console.log('Raw XML end user login response:', data.body)
            console.log('sending respond from end user login')
            sessionId = await Response.query?.logon?.sessionId;

            if (sessionId === undefined) {
                sessionId = 'no session Id';
            } else {
                sessionId = Response.query?.logon?.sessionId;
            }
            console.log('sessionId:', sessionId)


            return new Response(JSON.stringify({ sessionId : sessionId }), {
                status:200,
                headers: {
                  'Content-Type': 'application/json'
          
                },
              });

        } else {
            console.error('Error with vendor login: ', response.statusText);
        }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
            
        }
