"use client"
import { redirect } from 'next/navigation'
import { useState } from 'react';
import {setSessionData, sessionData} from './sessionStore';

export default function Home() {
  let [userName, setUserName] = useState('');
  let [password, setPassword] = useState('');
  let vendorUser = process.env.vendorUser;
  let vendorPass = process.env.vendorPass;
  let url = process.env.CONNECTION_URL;
  let sessionId = null;
  let personSerial;
  let loginSerial;




  const vendorLogin = async () => {
    try {
      const response = await fetch('/api/vendorLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendorUser, vendorPass, url }),
      });
      if (response.ok) {
        const data = await response.json();
        sessionId = (data.sessionId);
        return sessionId;
      } else {
        return;
      }
    } catch (error) {
      console.error('error during vendor login:', error);
      return
    }
  }

  const postingStatus = async (sessionId, loginSerial, personSerial) => {
    try {
      const response = await fetch('./api/postingStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: sessionId, loginSerial: loginSerial, personSerial: personSerial }),
      });
      if (response.ok) {
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

  const endUserLogin = async (sessionIdparam) => {
    try {
      const response = await fetch('./api/endUserLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, userPassword: password, sessionId: sessionIdparam }),
      });
      if (response.ok) {
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
 
    if (sessionId === null || undefined) {
      console.log('session id undefined')
      let vendorLoginResponse = await vendorLogin();
      sessionId = (vendorLoginResponse);
      console.log('session id check page.js:', sessionId)
    }
    let endUserLoginResponse = await endUserLogin(sessionId);

    if (endUserLoginResponse.sessionId === 'Session not logged on or session timed out') {
      sessionId = (vendorLoginResponse);
      let retryEndUser = await endUserLogin(sessionId);
      console.log('second try at end user login:', retryEndUser)
      return;

    } else if (endUserLoginResponse.ok && sessionId !== undefined) {
      loginSerial = endUserLoginResponse.loginSerial;
      personSerial=endUserLoginResponse.personSerial;


      let postingResponse = await postingStatus(sessionId, loginSerial, personSerial);

      setSessionData({
        sessionId, 
        loginSerial, 
        personSerial, 
        personFirstName: postingResponse.personFirstName,
        personLastName:postingResponse.personLastName,
        accounts:postingResponse.accounts})
      redirect('/viewAccounts')
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>


          </form>
        </div>
      </main>

    </div>
  );
};
