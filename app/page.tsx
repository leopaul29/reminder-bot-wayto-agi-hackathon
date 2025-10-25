"use client";
import { useEffect, useState } from "react";
import { subDays, parseISO } from "date-fns";
import Chat from "@/components/Chat";
import Reminders from "@/components/Reminders";

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

  // Simple timer that checks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toDateString();
      reminders.forEach((r) => {
        if (new Date(r.triggerDate).toDateString() === today) {
          alert(r.message);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <main className="flex flex-col items-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Gentle Reminder Bot</h1>
      <Chat onReminders={addReminders} />
      <Reminders reminders={reminders} />
    </main>
  );
}
