// src/app/api/signup/route.js (App Router - Next.js 13+)
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");

        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        // Add new user
        await users.insertOne({ email, password });
        return NextResponse.json({ success: true, message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
