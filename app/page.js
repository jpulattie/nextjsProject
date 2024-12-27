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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username: ',userName);
    console.log('password: ',password);

    const vendorLoginResponse = await fetch('/api/vendorLogin', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ vendorUser, vendorPass, url}),
      });

      console.log('here', vendorLoginResponse)

    if (!vendorLoginResponse.ok) {
        console.error('Vendor login failed with status:', vendorLoginResponse.status);
        setError('Vendor login failed');
        return;
      }
    
    const data = await vendorLoginResponse.json();
    console.log('Vendor login response:', data);

    const sessionID = data.sessionID; // Adjust this based on your actual response
    console.log('Session ID:', sessionID);

  

    const endUserLoginResponse = await fetch('/api/endUserLogin', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ userName, password, sessionID }),
      });

    const data2 = await endUserLoginResponse.json();
    if (endUserLoginResponse.ok) {
      console.log('Login successful:', data2);
      router.push('/app/viewAccounts/page.js')
    } else {
      setError(data2.message);
    }
  };
  

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
            
            /> 
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
      
    </div>
  );
};
