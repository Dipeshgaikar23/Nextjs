"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignUp() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Signup
            </h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="text" name="" 
            id="username"
            placeholder="Username"
            value={user.username} onChange={(e) => setUser({...user, username:e.target.value})} 
            />
            <label htmlFor="email">Email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="email" name="" 
            id="email" 
            placeholder="Email"
            value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} 
            />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="password" name="" 
            id="password" 
            placeholder="Password"
            value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} 
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup</button>
            <Link href="/login">Visit Login</Link>
        </div>
    )
}