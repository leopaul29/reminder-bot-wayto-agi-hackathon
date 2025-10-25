"use client";
import { useState } from "react";
import { addDays, parseISO } from "date-fns";

export default function Chat({ onReminders }: { onReminders: (r: any) => void }) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");

    async function sendMessage() {
        if (!input.trim()) return;

        const newMsg = { role: "user", content: input };
        const updated = [...messages, newMsg];
        setMessages(updated);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updated }),
        });

        const data = await res.json();
        const reply = data.message;
        setMessages((m) => [...m, reply]);

        // Try to extract JSON
        // try {
        //     const json = JSON.parse(reply.content);
        //     if (json.reminders) onReminders(json);
        // } catch { }
        try {
            // Extract JSON between ```json and ```
            const match = reply.content.match(/```json\s*([\s\S]*?)```/);
            if (match) {
                const json = JSON.parse(match[1]);
                if (json.reminders) onReminders(json);
            }
        } catch (err) {
            console.error("Failed to parse JSON:", err);
        }
        setInput("");
    }

    return (
        <div className="w-full max-w-md border p-4 rounded-xl">
            <div className="h-64 overflow-y-auto mb-3">
                {messages.map((m, i) => (
                    <p key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                        <span className={m.role === "user" ? "bg-blue-100 px-2 py-1 rounded-xl inline-block" : "bg-gray-100 px-2 py-1 rounded-xl inline-block"}>
                            {m.content}
                        </span>
                    </p>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className="border p-2 flex-grow rounded-xl"
                    placeholder="Write something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-xl">
                    Send
                </button>
            </div>
        </div>
    );
}
