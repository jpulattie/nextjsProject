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
  let sessionId = process.env.sessionId;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username: ',userName);
    console.log('password: ',password);


    try {
      console.log('trying end user login')
      const endUserLoginResponse = await fetch('./api/endUserLogin', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ userName, userPassword: password, sessionId }),
        });
        
      const data2 = await endUserLoginResponse.json();
      console.log('response from end user login', data2)
      console.log('sessionId', sessionId)
      if (endUserLoginResponse.ok && sessionId !== undefined) {
        console.log('Login successful:', data2.loggedIn);
        console.log('sessionId:', sessionId)
        
        //router.push('/app/viewAccounts/page.js')
      } else {
        console.log('Login unsuccessful:', data2);

        setError(data2.message);
      }
    }
    catch {    const vendorLoginResponse = await fetch('/api/vendorLogin', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ vendorUser, vendorPass, url}),
      });

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
          <form onSubmit = { handleSubmit }>
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
