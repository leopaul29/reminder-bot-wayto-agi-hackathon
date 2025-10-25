import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
	const { messages } = await req.json();

	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "system",
				content: `
You are a calm and gentle assistant for someone who forgets things easily.
You speak English, short and clear.
When the user mentions an event with a date, generate simple reminders in JSON.
Each reminder should have "days_before" and "message".
Example:
{
  "event": "Halloween party",
  "date": "2025-10-31",
  "reminders": [
    { "days_before": 7, "message": "Think about your cosplay." },
    { "days_before": 3, "message": "Did you buy your costume?" },
    { "days_before": 2, "message": "Did you get candies?" },
    { "days_before": 1, "message": "Pack your things for tomorrow." },
    { "days_before": 0, "message": "Don't forget your cosplay and candies!" }
  ]
}`,
			},
			...messages,
		],
		temperature: 0.4,
		max_tokens: 150,
	});

	const message = completion.choices[0].message;
	return NextResponse.json({ message });
}
