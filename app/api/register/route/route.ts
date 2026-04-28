import User from "@/models/user";
import { connectToDatabase } from "@/utils/dbconnection";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

async function GET(request:NextRequest) {

    try {
        
        const {email,password} = await request.json();
        
        if(!email || !password) return NextResponse.json(
            {error: "EMAIL AND PASSWROD ARE REQUIRED"},
            { status:400 }
        )

        await connectToDatabase();
        const user = await User.findOne({email});

        if(user) { return NextResponse.json(
            {error: "USER ALREADY EXISTS"},
            { status:400 }
        )}

       const newUser= await User.create({email,password});

       return NextResponse.json(
        {message: "USER CREATED SUCCESSFULLY", user: newUser},
        { status:201 }
       )
         

    } catch (error) {
        return NextResponse.json(
            {error: "INTERNAL SERVER ERROR"},
            { status:500 }
        )
    }
    
}