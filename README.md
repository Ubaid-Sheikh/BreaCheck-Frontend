# 🔐 Password Breach Checker (Frontend)

A secure and interactive web app to check if your password has been exposed in any known data breaches — powered by the **Have I Been Pwned (HIBP)** API.

---

## 🌟 Features

- 🧠 **SHA-1 Client-Side Hashing** — Passwords are never sent in plain text  
- 🚀 **Fast and Simple UI** — Built with React and Tailwind CSS  
- 🔍 **Real-Time Results** — Checks breach count instantly via backend  
- 🔄 **Smooth Navigation** — Managed using React Router  
- 🧩 **Reusable Components** — Clean and modular codebase  

---

## 🧠 How It Works

1. User enters a password in the input field.  
2. The password is **hashed locally** (SHA-1).  
3. The hash is split into:
   - `prefix`: first 5 characters  
   - `suffix`: remaining 35 characters  
4. The `prefix` and `suffix` are sent to the backend (`/check-password`).  
5. The backend queries the **HIBP API** and returns:  
   - Whether the password was found  
   - Number of times it appeared in breaches  
6. The frontend displays a result:
   - ✅ **Safe Password**
   - ⚠️ **Compromised Password**

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|----------|
| **React.js** | Frontend framework |
| **React Router** | Navigation between pages |
| **Tailwind CSS** | Styling and UI design |
| **Fetch API** | Communication with backend |
| **Vite** | Development environment (optional) |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/password-breach-checker-frontend.git
cd password-breach-checker-frontend
