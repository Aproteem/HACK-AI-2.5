// src/app/api/login/route.js (App Router - Next.js 13+)
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");

        const user = await users.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (user.password !== password) {
            return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
        }

        return NextResponse.json({ success: true, message: "Login successful" });
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
