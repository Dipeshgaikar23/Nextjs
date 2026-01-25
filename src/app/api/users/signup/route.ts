import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {username, email, password} = body; 

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return NextResponse.json({message: "User already exists", success: false}, {status: 400});
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log("New User Created:", savedUser);

        return NextResponse.json({message: "User created successfully", success: true, savedUser}, {status: 201});
    }
    catch (error) {
        console.log("Error in Signup route", error);
        return NextResponse.json({message: "Internal Server Error", success: false}, {status: 500});
    }
}