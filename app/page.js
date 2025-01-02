"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Home() {
  let [userName, setUserName] = useState('');
  let [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);
  let vendorUser = process.env.vendorUser;
  let vendorPass = process.env.vendorPass;
  let url = process.env.CONNECTION_URL;
  let sessionId;

  const vendorLogin = async() => {
    try {
      const response = await fetch('/api/vendorLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendorUser, vendorPass, url }),
      });
      if (response.ok){
        const data = await response.json();
        sessionId = data.sessionId;
        console.log('returned sessionId:', sessionId)
        return sessionId;
      } else {
        console.error("Vendor Login Failed:", response.statusText);
        return;
      }
      } catch (error) {
        console.error('error during vendor login:', error);
        return
      }
    }
  
  
  
  const endUserLogin = async () => {
    try {
      const response = await fetch('./api/endUserLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, userPassword: password, sessionId }),
  });
  if (response.ok){
    const data = await response.json();
    return data;
  } else {
    console.error("Vendor Login Failed:", response.statusText);
    return;
  }
  } catch (error) {
    console.error('error during vendor login:', error);
    return
  }
}

    

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username: ', userName);
    console.log('password: ', password);



    console.log('trying end user login')
    let endUserLoginResponse = await endUserLogin();
    let vendorLoginResponse = await vendorLogin();

    const data2 = await endUserLoginResponse.json();
    console.log('response from end user login', data2)
    console.log('sessionId', sessionId)
    if (endUserLoginResponse.ok && sessionId === undefined) {
      console.log('sessionId undefined, trying vendor and end user logins again')
      
      console.log('no session id found, vendor login ran')
      console.log('new session id:', sessionId)
      return;
      
    } else if (endUserLoginResponse.ok && sessionId !== undefined) {
      console.log('Login successful:', data2.loggedIn);
      console.log('sessionId:' + sessionId + '(end sessionId)')

      //router.push('/app/viewAccounts/page.js')
    } else {

      console.log('Login unsuccessful:', data2);
      vendorLoginResponse();

      console.log('here', vendorLoginResponse)

      if (!vendorLoginResponse.ok) {
        console.error('Vendor login failed with status:', vendorLoginResponse.status);
        //setError('Vendor login failed');
        return;
      }
    };

  }
  return (
    <div>
      <main>
        <div>
          <h2> Please Login </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
            <input type="password"

            />
            <button type="submit">Login</button>
          </form>
        </div>
      </main>

    </div>
  );
};
