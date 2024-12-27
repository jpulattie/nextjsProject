import Image from "next/image";
import Form from 'next/form';
//import { useState } from 'react';  

export default function Home() {
  //let [userName, setUserName] = useState('');
  //let [password, setPassword] = useState('');

  const handleSubmit = (submit) => {
    event.preventDefault();
    console.log('username: ',userName);
    console.log('password: ',password);
  };

  return (
    <div>
      <main>
        <div>
          <h2> Please Login </h2>
          <Form action="/Calls">
            <input name="username" />
            <input password="password" /> 
            <button type="submit">Login</button>
          </Form>
        </div>
      </main>
      
    </div>
  );
}
