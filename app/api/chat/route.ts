import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

const SYSTEM_INSTRUCTION = `
You are the "Chunaav Assistant", a friendly and expert AI concierge for the Chunaav application.
Your goal is to educate users about the Indian electoral process in a neutral, non-partisan, and engaging way.

Key knowledge areas:
1. Election Commission of India (ECI) hierarchy and roles.
2. Historical milestones of Indian elections (since 1951).
3. The technical workings of EVMs (Electronic Voting Machines) and VVPATs.
4. The process of filing nominations and running for office in India.
5. Simple explanations of political jargon (Model Code of Conduct, Constituency, etc.).

Tone and Style:
- Professional yet approachable.
- Use simple analogies for complex topics.
- Always remain non-partisan; never favor any political party or candidate.
- If a user asks a question about a specific current candidate's performance or political bias, politely redirect them to neutral civic learning.
- Keep responses relatively concise for a chat interface.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1].content;

    const { text } = await generateText({
      model: google('gemini-2.0-flash-lite'),
      system: SYSTEM_INSTRUCTION,
      prompt: latestMessage,
    });

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Gemini API Error Detail:', error);

    if (error.status === 429 || error.message?.includes('429')) {
      return NextResponse.json({
        error: 'The AI assistant has reached its capacity. Please wait a minute before trying again.'
      }, { status: 429 });
    }

    return NextResponse.json({ error: error.message || 'AI request failed' }, { status: 500 });
  }
}
