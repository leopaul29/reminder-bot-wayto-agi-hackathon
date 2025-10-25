"use client";
import { useEffect, useState } from "react";
import { subDays, parseISO } from "date-fns";
import Chat from "@/components/Chat";
import Reminders from "@/components/Reminders";
import ReminderCalendar from "@/components/ReminderCalendar";
import { Toaster } from "react-hot-toast";

export default function Page() {
  const [reminders, setReminders] = useState<any[]>([]);

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
    <main className="flex flex-col items-center p-6 gap-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold">Gentle Reminder Bot</h1>
      <Chat onReminders={addReminders} />

      <div className="flex flex-col md:flex-row gap-6">
        <Reminders reminders={reminders} />
        <ReminderCalendar reminders={reminders} />
      </div>
    </main>
  );
}
