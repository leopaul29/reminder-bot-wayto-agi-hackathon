import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// Parse the incoming request body
		const body = await request.json();

		// Forward the request to the external API
		const response = await fetch(
			"https://beelike-unconductible-milly.ngrok-free.dev/api/agents/todoPlannerAgent/generate",
			{
				method: "POST",
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}
		);

		// Check if the external API request was successful
		if (!response.ok) {
			throw new Error(`External API responded with status: ${response.status}`);
		}

		// Parse the response from the external API
		const data = await response.json();

		// Return the response to the client
		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{ error: "Failed to fetch from external API", details: error.message },
			{ status: 500 }
		);
	}
}
