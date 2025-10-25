import { useState } from "react";
import { Send, Sparkles, Bell } from "lucide-react";

export default function Chat({ onReminders }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    async function sendMessage() {
        if (!input.trim()) return;

        const newMsg = { role: "user", content: input };
        const updated = [...messages, newMsg];
        setMessages(updated);
        setInput("");

        // Call your API
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updated }),
        });

        const data = await res.json();
        const reply = data.message;
        setMessages((m) => [...m, reply]);

        // Extract JSON
        try {
            const match = reply.content.match(/```json\s*([\s\S]*?)```/);
            if (match) {
                const json = JSON.parse(match[1]);
                if (json.reminders) onReminders(json);
            }
        } catch (err) {
            console.error("Failed to parse JSON:", err);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    AI Assistant
                </h2>
                <p className="text-purple-100 mt-1">Describe your event, I'll handle the rest</p>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-20">
                            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Start by describing your event</p>
                            <p className="text-sm mt-2">Ex: "My wedding on June 15, 2026"</p>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user"
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {/* <p className="whitespace-pre-wrap">{(m.content).split('```')[0]}</p> */}
                                <p className="whitespace-pre-wrap">{(m.content)}</p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <input
                        className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors"
                        placeholder="Ex: My birthday on December 25th..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
        </div>
    );
}