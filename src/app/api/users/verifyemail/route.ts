import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';


connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Received token:", token);

        const user = await User.findOne({ verifyTokenExpiry: { $gt: Date.now() } })

        if (!user || !user.verifyToken) {
            return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
        }
        console.log(user);
        // 2️⃣ Compare bcrypt hash properly
        const isValid = await bcrypt.compare(
            user._id.toString(),
            token
        );

        if (!isValid) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 400 }
            );
        }


        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'Email verified successfully', success: true },);

    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}