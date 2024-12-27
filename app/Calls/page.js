'use server'


import { FormEvent} from 'react'
import { useRouter } from 'next/navigation'

export async function vendorLogin() {
    let vendorUserName = process.env.vendorUserName;
    let vendorPassword = process.env.vendorPassword;
    async function fetch(req,res) {

    }
}

async function endUserLogin(userName,password) {
    let user = userName;
    let pass = password;

    const call = `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0"
    sessionId="${req.session.sessionID}">
    <sequence>
      <transaction>
      <step>
        <loginVerify>
        <loginId>${user}</loginId>
        <password>${pass}</password>
        </loginVerify>
      </step>
      </transaction>
    </sequence>
    </query>
    `;
    
    try {
        const settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
    const response = await fetch(process.env.CONNECTION_URL, settings);
    if (response.status === 200) {
        const text = await response.text();
        console.log('Request: ', call)
        console.log('Response: ', text)
        return text;
    }
    } catch (e) {
        return e;
    }
}

export default function Login() {
    const router = useRouter()

async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const userName = formData.get('username')
    const password = formData.get('password')

    const response = await fetch()
}


return (
    <form onSubmit={handleSubmit}>
      <input type="name" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}