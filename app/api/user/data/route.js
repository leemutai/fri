import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";


export async function GET(request){
    try {
        
        const {userId} = getAuth(request)

        await connectDB()
        const user = await User.findById(userId)
        if (!user) {
            return NextRequest.json({success:false,message:"User Not Found"})
            
        }
        return NextRequest.json({success:true,user})
        
    } catch (error) {
        return NextRequest.json({success:false,message:error.message})
    
    }
}