"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function ReminderCalendar({ reminders }: { reminders: any[] }) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        // console.log("reminders:", reminders);
        // console.log("selected date:", new Date(reminders[0].triggerDate).toDateString());
        // console.log("date.toDateString():", date.toDateString());
        // Find reminders for that date
        const sameDayReminders = reminders.filter(
            (r) => new Date(r.triggerDate).toDateString() === date.toDateString()
        );

        if (sameDayReminders.length > 0) {
            sameDayReminders.forEach((r) => {
                toast(`${r.event}: ${r.message}`, {
                    icon: "🎯",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            });
        } else {
            toast(`No reminders on ${format(date, "MMM d, yyyy")}`, {
                icon: "📅",
                style: {
                    borderRadius: "10px",
                    background: "#444",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <div className="w-full max-w-md border p-4 rounded-xl bg-white shadow">
            <h2 className="text-lg font-semibold mb-2">Check reminders by date</h2>
            <Calendar onChange={(value) => handleDateChange(value as Date)} value={selectedDate} />
        </div>
    );
}
