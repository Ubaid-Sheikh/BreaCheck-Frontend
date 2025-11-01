🔐 Password Breach Checker 

This is the frontend for the Password Breach Checker web app.
It allows users to securely check whether their passwords have been compromised in any known data breaches using the Have I Been Pwned (HIBP) API (via the backend).

🚀 Features

✅ User-friendly password input form

🔒 Client-side SHA-1 hashing (no plain passwords sent over the network)

⚡ Real-time API communication with backend

🧩 Displays whether a password has been breached, and how many times

💬 Simple, modern UI built with React + Tailwind CSS

🔁 Navigation between pages using React Router


🧠 How It Works

The user enters a password in the form.

The app hashes the password locally using SHA-1 and splits it into:

prefix: first 5 characters of the hash

suffix: the remaining hash part

The frontend sends the prefix and suffix to the backend (/check-password).

The backend checks against the HIBP API and returns:

whether the password was found in breaches

how many times it appeared

The frontend then shows a detailed result (safe or compromised).


🛠️ Tech Stack

React.js — Frontend library

React Router — Page navigation

Tailwind CSS — Styling

Fetch API — Backend communication

Vite — (if applicable) development setup

⚙️ Installation & Setup
git clone https://github.com/your-username/password-breach-checker-frontend.git
cd password-breach-checker-frontend

2️⃣ Install dependencies
npm install

3️⃣ Run the app
npm run dev

The app should now be running on http://localhost:5173 (or your configured port).

🔗 Backend
This frontend communicates with the backend at:
http://localhost:3000/check-password

Make sure the backend server is running before testing the app.

📸 UI Overview
Home Page: Enter password to check
Results Page: Displays password breach status and recommendations

📜 License
This project is open-source under the MIT License.

👨‍💻 Author
Ubaid Sheikh
Linkedin Profile : https://www.linkedin.com/in/ubaid018
