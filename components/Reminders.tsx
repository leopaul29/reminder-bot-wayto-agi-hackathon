"use client";
import { format, subDays } from "date-fns";

export default function Reminders({ reminders }: { reminders: any[] }) {
    return (
        <div className="w-full max-w-md border p-4 rounded-xl bg-green-50">
            <h2 className="text-lg font-semibold mb-2">Upcoming reminders</h2>
            {reminders.length === 0 ? (
                <p className="text-gray-500">No events yet.</p>
            ) : (
                <ul className="space-y-2">
                    {reminders.map((r, i) => (
                        <li key={i} className="bg-white p-2 rounded-md border">
                            <b>{r.event}</b> → {r.message} <br />
                            <small>Trigger: {format(new Date(r.triggerDate), "yyyy-MM-dd")}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
