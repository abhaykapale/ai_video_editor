import Video, { IVideo } from "@/models/video";
import { connectToDatabase } from "@/utils/dbconnection";
import { getServerSession } from "next-auth";
import { NextRequest, NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
       const videos = await Video.find({}).sort({ createdAt: -1 }).lean();


        if(!videos || videos.length === 0 ) return NextResponse.json({ error: "No videos found" }, { status: 404 });


        return NextResponse.json({ videos }, { status: 200 });  
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });                 
    }
}   


export async function POST(request: NextRequest) {
    try {
        const session= await getServerSession() // Check if user is authenticated, will throw error if not authenticated
        
        if(!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body : IVideo =await request.json();
        const { title, description, videoUrl } = body;
        
        if(!title || !description || !videoUrl) return NextResponse.json({ error: "Title, description and videoUrl are required" }, { status: 400 });

        await connectToDatabase();

        const newVideo = new Video({
            ...body,
            controls:body?.controls ?? true, // Default to true if controls is not provided
            transformations: {
                height: 1920,
                width: 1080,
                quality : body.transformation?.quality ?? 100

            } ,
            creator: session.user.id, // Assuming session.user contains the authenticated user's information
        });
        await newVideo.save();
        return NextResponse.json({ video: newVideo }, { status: 201 });

    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });                 
    }       
}