import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {email, password} = body; 
        //check if user exists
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return NextResponse.json({message: "User does not exist", success: false}, {status: 400});
        }   
        //compare password
        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return NextResponse.json({message: "Invalid credentials", success: false}, {status: 400});
        }

        //create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            "messege": "Login successful",
            "success": true,
        })
        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60, // 1 day 
        })
        return response
        
    }
    catch (error) {
        console.log("Error in Login route", error);
        return NextResponse.json({message: "Internal Server Error", success: false}, {status: 500});
    }
}