"use client";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function ReminderCalendar({ reminders }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        setSelectedDate(clickedDate);

        const sameDayReminders = reminders.filter(
            r => new Date(r.triggerDate).toDateString() === clickedDate.toDateString()
        );

        if (sameDayReminders.length > 0) {
            // alert(`📅 ${clickedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}\n\n${sameDayReminders.map(r => `🎯 ${r.event}: ${r.message}`).join('\n')}`);
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

            // alert(`📅 No reminders on ${clickedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}`);
            toast(`No reminders on ${clickedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}}`, {
                icon: "📅",
                style: {
                    borderRadius: "10px",
                    background: "#444",
                    color: "#fff",
                },
            });
        }
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
    const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const hasReminderOnDate = (day) => {
        const checkDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        return reminders.some(r => new Date(r.triggerDate).toDateString() === checkDate.toDateString());
    };

    const changeMonth = (offset) => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset, 1));
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6" />
                    Calendar
                </h2>
                <p className="text-blue-100 mt-1">Click on a date to see reminders</p>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        ←
                    </button>
                    <h3 className="text-xl font-semibold text-gray-800 capitalize">{monthName}</h3>
                    <button
                        onClick={() => changeMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        →
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                            {day}
                        </div>
                    ))}

                    {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const hasReminder = hasReminderOnDate(day);
                        const isToday = new Date().toDateString() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toDateString();

                        return (
                            <button
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all hover:scale-110 relative ${isToday
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : hasReminder
                                        ? 'bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-md'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {day}
                                {hasReminder && !isToday && (
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}