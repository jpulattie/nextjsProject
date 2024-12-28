'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export const EndUserLogin = async () => {
    const router = useRouter();
    const vendorUser = process.env.vendorUser
    const vendorPass = process.env.vendorPass
    const url = process.env.CONNECTION_URL

    const call = `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0"
    sessionId="${req.session.sessionId}">
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
            const data = await response.json();
            console.log('response from vendorLogin: ', data);
            router.push('/app/api/endUserLogin/page.js')
        } else {
            console.error('Error with vendor login: ', response.statusText);
        }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
        }

        useEffect(() => {
            vendorLoginCall();
        }, []);


