# Galaxy Explorer (Client)

Welcome to the frontend application for **Galaxy Explorer** – a futuristic, interactive web application built with **Next.js** and **TailwindCSS** for exploring planets, stars, galaxies, astronauts, and celestial missions.

---

## 🚀 Key Features

*   **Celestial Explorer Registry:** Browse detailed space entries categorized into Missions, Planets, Stars, Galaxies, Nebulae, and Astronauts.
*   **Dynamic Filtering & Search:** Real-time search with pagination and sorting by newest, highest rated, or distance from Earth.
*   **User Reviews:** Logged-in users can submit star ratings and detailed reviews on celestial entries.
*   **User Dashboard:** Manage user profile details and customize avatar.
*   **Futuristic Design:** Built with a premium, responsive dark-mode UI containing modern card layouts and smooth hover effects.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Library:** React 19
*   **Styling:** TailwindCSS
*   **Icons:** Lucide React
*   **Notifications:** React Hot Toast
*   **Charts:** Recharts (for cosmic data visualizations)

---

## ⚙️ Environment Variables

To run the client app, create a `.env` file in the `client` root directory and add the following:

```env
# The URL where this Next.js app is running
NEXT_PUBLIC_APP_URL=http://localhost:3000

# The URL where your Backend Express Server is running
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🏃 Local Setup & Installation

Follow these steps to run the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Folder Structure

```text
client/
├── public/              # Static files (images, favicon)
├── src/
│   ├── app/             # Page routes (App Router)
│   ├── components/      # Reusable UI components
│   ├── context/         # AuthContext provider
│   ├── lib/             # Validations and database utils
│   └── models/          # Simplified data models
├── next.config.ts       # Next.js configurations & API rewrites
├── tailwind.config.ts   # Tailwind styling configurations
└── package.json         # Scripts and package dependencies
```
