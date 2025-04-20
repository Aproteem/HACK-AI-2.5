// app/api/chat/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req) {
    const { prompt } = await req.json();
    const customPrompt = `You are a helpful assistant. Respond clearly and concisely.\n\nUser: ${prompt}`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: customPrompt,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('OpenAI Error:', err);
            return NextResponse.json({ error: err.error?.message || 'OpenAI Error' }, { status: 500 });
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message?.content?.trim();

        return NextResponse.json({ message });
    } catch (err) {
        console.error('Fetch failed:', err);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}
