"use client";
import { CheckCircle2, Clock, Bell, ArrowRight } from "lucide-react";

export default function Reminders({ reminders }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    Upcoming Reminders
                </h2>
                <p className="text-green-100 mt-1">
                    {reminders.length} task{reminders.length !== 1 ? 's' : ''} scheduled
                </p>
            </div>

            <div className="p-6">
                {reminders.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No reminders yet</p>
                        <p className="text-sm mt-2">Create an event to get started</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
                        {reminders.map((r, i) => {
                            const triggerDate = new Date(r.triggerDate);
                            const daysUntil = Math.ceil((triggerDate - new Date()) / (1000 * 60 * 60 * 24));

                            return (
                                <div
                                    key={i}
                                    className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full p-2 mt-1">
                                            <Bell className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 mb-1">{r.event}</h3>
                                            <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                                                <ArrowRight className="w-4 h-4" />
                                                {r.message}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                                                    {triggerDate.toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                {daysUntil >= 0 && (
                                                    <span className="text-gray-500">
                                                        {daysUntil === 0 ? "Today" : `In ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <style jsx>{`
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