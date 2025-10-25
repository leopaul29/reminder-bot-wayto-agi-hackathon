
# 🧠 Gentle Reminder Bot

A calm, conversational assistant that helps people **remember upcoming events** through a friendly chat, an interactive **calendar**, and **gentle reminders**.

Built during a **hackathon (1h30 build)** using **Next.js + OpenAI + React Calendar + React Hot Toast**.

---

## ✨ Overview

Gentle Reminder Bot is a lightweight web tool designed to **help anyone who forgets things easily** — from busy professionals to elderly users.
It combines a **chat interface** (powered by GPT) with an **auto-generated to-do list** and a **calendar** that displays reminders visually.

When a user tells the assistant about an upcoming event (e.g., *“I’m having a Halloween party next week”*), the bot:

1. Understands the event and date.
2. Generates **timed reminders** (1 week before, 3 days before, etc.).
3. Adds them automatically to a local reminder list.
4. Lets users explore reminders by date through the calendar.
5. Triggers **gentle notification toasts** when the selected date has reminders.

---

## 💡 Why we built it (Hackathon story)

This project was built during a **1h30 hackathon sprint**, starting as a tool for people with early Alzheimer’s or memory challenges — designed to **speak calmly, use simple language, and provide reassurance**.

But it quickly evolved into something useful for **anyone** who wants a stress-free reminder system:

* No complex setup
* No login required
* Just chat naturally and get your reminders created automatically

Our goal was to show how AI can **adapt to human tone and pace**, making technology more accessible and empathetic.

---

## 🛠️ Tech Stack

| Feature        | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | Next.js (React + TypeScript) |
| Chat model     | OpenAI GPT-5 (via API)       |
| UI Components  | Tailwind CSS + ShadCN UI     |
| Calendar       | `react-calendar`             |
| Notifications  | `react-hot-toast`            |
| Date utilities | `date-fns`                   |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/gentle-reminder-bot.git
cd gentle-reminder-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

Create a `.env.local` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

### 4. Run locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗓️ How it works

1. Type something like:

   > “I have a dentist appointment next Monday.”

2. The AI generates structured reminders in JSON, such as:

   ```json
   {
     "event": "Dentist appointment",
     "date": "2025-10-28",
     "reminders": [
       { "days_before": 3, "message": "Confirm your appointment." },
       { "days_before": 1, "message": "Pack your insurance card." },
       { "days_before": 0, "message": "Don’t forget your appointment today!" }
     ]
   }
   ```

3. These reminders are displayed in a **to-do list**.

4. When you pick a date on the **calendar**, a **toaster popup** gently reminds you what’s happening that day.

---

## 💬 Example interaction

> **User:** I’m having a Halloween party next week.
> **Bot:** I’ve added reminders for your Halloween party:
> – Think about your costume.
> – Buy candies.
> – Pack your things for tomorrow.
> – Don’t forget your cosplay and candies!

---

## 🧩 Features Summary

* ✅ Calm, clear chatbot (few words, reassuring tone)
* ✅ Auto-generated reminders based on event date
* ✅ Persistent to-do list in memory
* ✅ Interactive calendar with reminder popups
* ✅ Built in less than 90 minutes for a live hackathon demo

---

## 💖 Future ideas

* Voice mode (talking assistant)
* SMS or push notifications
* Cloud-based reminder sync
* Accessibility mode with large fonts and audio prompts

---

## 🧑‍💻 Contributors

Built with ❤️ by a small hackathon team experimenting with **empathetic AI**.
Idea, design, and prototype completed in **1 hour 30 minutes**.

---

## 📜 License

MIT License — free to use, modify, and share.

---

Would you like me to make the README automatically detect the current project name and author (for your GitHub repo)? I can make a version that fills those dynamically for your hackathon submission.
