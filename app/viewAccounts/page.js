'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { sessionData } from '../sessionStore'

export default function ViewAccounts() {
    const personFirstName = sessionData.personFirstName;
    const personLastName = sessionData.personLastName;
    const accounts = sessionData.accounts;
    let personAccounts;


    if (accounts) {
        personAccounts = accounts;
        console.log(personAccounts)
    } 

    return (
        <div>
            <h1>Hello {personFirstName} {personLastName} </h1>
            {personAccounts && personAccounts.length > 0 ?
                personAccounts.map((item, index) => (
                    <ul key={index}>
                        <p>------------------- </p>
                        <p>Account Number: {item.accountNumber}</p>
                        {item.share && item.share.length > 0 ? 
                        item.share.map((shareItem, shareIndex)=> (
                            <li key={shareIndex}>
                                {shareItem.balance ? <p>Share ID: {shareItem.id} - Balance: ${shareItem.balance} </p> 
                                : <p>Share ID: {shareItem.id} - Balance: $0.00 </p>}
                            </li>
                        ))
                        : <p> </p>}
                    </ul>)) :
                <p>No accounts to display</p>
            }
        </div>
    )
}