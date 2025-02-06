import { parseStringPromise } from 'xml2js';

export async function POST(req ,res) {

    const data = await req.json()
    let { personSerial, loginSerial, sessionId } = data;
    const url = process.env.CONNECTION_URL;
    let sessionStatus = '';
    let sessionException;

    const call2 = `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0"
 sessionId="${sessionId}">
 <sequence>
  <transaction>
    <personSerial>${personSerial}</personSerial>
   <step>
        <postingStatus>
            <tableName>LOGIN</tableName>
            <targetSerial>${loginSerial}</targetSerial>
            <includePersonRelatedAccounts option="Y" />
        </postingStatus>
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
            console.log(parsedXML)


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
            const firstTrans = (parsedXML.query?.sequence?.[0].transaction?.[0]);
            const firstStep = firstTrans?.step?.[0];
            let accounts;
            if (firstStep?.postingStatus?.[0]?.account?.[0]) {
            accounts = firstStep?.postingStatus?.[0]?.account;
            }
            const personInfo = firstStep?.postingStatus?.[0]?.person?.[0];
            const personFirstName = firstStep?.postingStatus?.[0]?.person?.[0].firstName?.[0];
            const personLastName = firstStep?.postingStatus?.[0]?.person?.[0].lastName?.[0];


            return new Response(JSON.stringify({  
                personFirstName, 
                personLastName,
                accounts
                }), {
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

