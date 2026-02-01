"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { set } from "mongoose";


const VerifyEmailPage = () => {
    const [error, setError] = useState(false);
    const [token, setToken] = useState("");
    const [verfied, setVerified] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            console.log("Email verified successfully:", response.data);
        } catch (error: any) {
            setError(true);
            console.error("Error verifying email:", error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No token"}</h2>

            {verfied && !error && (
                <div>
                <h2 className="text-green-500 text-2xl">Email verified successfully!</h2>
                <Link href="/login" className="text-blue-500 underline">Go to Login</Link>
            </div>
            )}
            {error && (
                <div>
                <h2 className="text-red-500 text-2xl">Error verifying email. Please try again.</h2>
                <Link href="/register" className="text-blue-500 underline">Go to Register</Link>
            </div>
            )}
        </div>
    )
}

export default VerifyEmailPage;