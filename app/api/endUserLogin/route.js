import { parseStringPromise } from 'xml2js';


export async function POST(req ,res) {
    const data = await req.json()
    let { userName, userPassword, sessionId } = data;
    const url = process.env.CONNECTION_URL;
    let sessionStatus = '';
    let sessionException;

    const call2 = `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0"
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
                body: call2,
                headers: {
                'Content-Type':'application/xml',
                }});
        if (response.ok) {
            const xmldata = await response.text();
            const parsedXML = await parseStringPromise(xmldata);
            console.log('end user logon', xmldata)
            const firstTrans = (parsedXML.query?.sequence?.[0].transaction?.[0]);
            const firstStep = firstTrans?.step?.[0];

            const personSerialResult = firstStep?.loginVerify?.[0]?.personSerialResult?.[0];
            const loginSerialResult = firstStep?.loginVerify?.[0]?.loginSerialResult?.[0];
            if (parsedXML.query.sequence?.transaction?.exception !== undefined) {
            sessionException = parsedXML.query.sequence?.transaction?.exception?.message;
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
                let personSerial = personSerialResult 
                let loginSerial = loginSerialResult;


            return new Response(JSON.stringify({ sessionId : sessionId, personSerial:personSerial, ok: "ok", loginSerial: loginSerial }), {
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

