"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Chat from "@/components/Chat";
import ReminderCalendar from "@/components/ReminderCalendar";
import Reminders from "@/components/Reminders";
import { subDays, parseISO } from "date-fns";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [reminders, setReminders] = useState([]);
  const addReminders = (json: any) => {
    const base = parseISO(json.date);
    const newReminders = json.reminders.map((r: any) => ({
      event: json.event,
      message: r.message,
      triggerDate: subDays(base, r.days_before),
    }));
    setReminders((prev) => [...prev, ...newReminders]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Event Planner
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Plan your events with intelligence</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chat Section */}
          <Toaster position="top-right" />

          {/* <Chat onReminders={(newReminders) => setReminders(newReminders)} /> */}
          <Chat onReminders={addReminders} />

          {/* Right Panel */}
          <div className="space-y-6">
            <ReminderCalendar reminders={reminders} />
            <Reminders reminders={reminders} />
          </div>
        </div>
      </div>
    </div>
  );
}