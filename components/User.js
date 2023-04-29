import React from 'react'
import './User.css'

export default function User({ selectedUser }) {

    if (!selectedUser) {
        return
    }

    const { id, name, username, address, email, phone, website, company } = selectedUser;
    return (
        <div className='userCard'>
            <p className='mt-3 mb-0'><b>Id:</b> {id}</p>
            <p className='mt-3 mb-0'><b>Name:</b> {name}</p>
            <p className='mt-3 mb-0'><b>Username:</b> {username}</p>
            <p className='mt-3 mb-0'><b>Street:</b> {address.street}</p>
            <p className='mt-3 mb-0'><b>Email:</b> {email}</p>
            <p className='mt-3 mb-0'><b>Phone:</b> {phone}</p>
            <p className='mt-3 mb-0'><b>Website:</b> {website}</p>
            <p className='my-3'><b>Company:</b> {company.name}</p>
        </div> 
    )
}
