import { parseStringPromise } from 'xml2js';


export async function POST(req ,res) {
    //const request = await req.headers.get('Content-Type');

    
    const data = await req.json()
    //console.log('request to end user login from page.js:', data)
    let { userName, userPassword, sessionId } = data;
    const url = process.env.CONNECTION_URL;
    let sessionStatus = '';
    let sessionException;

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
            console.log('end user login call', call)

            const response = await fetch(url, {
                method: 'POST',
                body: call,
                headers: {
                'Content-Type':'application/xml',
                }});
        if (response.ok) {
            const xmldata = await response.text();
            const parsedXML = await parseStringPromise(xmldata);

            //console.log('Raw XML end user login response:', data.body)
            console.log('sending respond from end user login')
            console.log('response from end user call:', response)
            console.log('parsedXML:', parsedXML);
            if (parsedXML.query.sequence[0].transaction[0].exception === undefined) {
            sessionException = parsedXML.query.sequence[0].transaction[0].exception[0].message[0];
            console.log('exception check:', sessionException);
            }
            const notLoggedIn = 'Session not logged on or session timed out'

            if (sessionException === notLoggedIn) {
                console.log('Not Logged in')
                sessionId = sessionException;
                return new Response(JSON.stringify({ sessionId : sessionId, sessionException }), {
                    status:200,
                    headers: {
                      'Content-Type': 'application/json'
              
                    },
                  });
            } else {
                sessionId = Response.query?.logon?.sessionId;
            
            


            return new Response(JSON.stringify({ sessionId : sessionId }), {
                status:200,
                headers: {
                  'Content-Type': 'application/json'
          
                },
              });

        }} else {
            console.error('Error with vendor login: ', response.statusText);
        }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
            
    };

