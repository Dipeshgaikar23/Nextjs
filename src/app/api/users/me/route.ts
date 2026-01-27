import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await getTokenData(request);
        console.log("user data from token", user);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error:any) {
        console.log("get token data failed", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}