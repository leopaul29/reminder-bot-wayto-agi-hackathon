"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ChatProps {
    onReminders: (json: any) => void;
}

export default function Chat({ onReminders }: ChatProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to the chat
        setMessages((prev) => [...prev, message]);

        try {
            // Send the message to the API route
            const response = await fetch("/api/planner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [message],
                    threadId: "chat-thread",
                    resourceId: "todo-planner",
                    runId: "run-1",
                    structuredOutput: {
                        schema: {},
                        model: "default",
                        instructions: "Generate a todo list based on the user's message.",
                        errorStrategy: "strict",
                        fallbackValue: {},
                    },
                    tracingOptions: {
                        metadata: {},
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch from API");
            }

            const data = await response.json();

            // Assuming the API returns a structured response with reminders
            // Adjust this based on the actual API response structure
            const remindersData = {
                event: message,
                date: new Date().toISOString(), // Replace with actual date from API if available
                reminders: data.reminders || [], // Adjust based on actual response
            };

            // Pass reminders to the parent component
            onReminders(remindersData);

            // Add bot response to the chat
            setMessages((prev) => [...prev, "Reminders added!"]);
            toast.success("Reminders added successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to process your request.");
            setMessages((prev) => [...prev, "Sorry, something went wrong."]);
        }

        // Clear the input field
        setMessage("");
    };

    return (
        <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
            <div className="h-64 overflow-y-auto mb-4 p-2 border rounded">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        {index % 2 === 0 ? (
                            <p className="text-blue-600">You: {msg}</p>
                        ) : (
                            <p className="text-gray-600">Bot: {msg}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}