import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

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
        return NextResponse.json({message: "Login successful", success: true, existingUser}, {status: 200});
    }
    catch (error) {
        console.log("Error in Login route", error);
        return NextResponse.json({message: "Internal Server Error", success: false}, {status: 500});
    }
}