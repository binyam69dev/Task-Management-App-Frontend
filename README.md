# 🚀 Task Management App – Frontend

A modern, responsive task management application built with **React** and  **Tailwind CSS** , featuring real-time updates, authentication integration, and a clean UI/UX.

---

## ✨ Features

* 🔐 User authentication (Login/Register)
* 📋 Create, update, delete tasks
* ⚡ Real-time UI updates
* 📱 Fully responsive design
* 🎨 Modern UI with Tailwind CSS
* 🔍 Task filtering & status tracking
* 🌙 Clean and scalable component structure

---

## 🛠️ Tech Stack

* **React** – UI library
* **Tailwind CSS** – Styling
* **Axios / Fetch API** – API communication
* **React Router** – Routing
* **Context API / Zustand (optional)** – State management

---

## 📁 Project Structure

```
src/
│── components/        # Reusable UI components
│── pages/             # Page-level components
│── hooks/             # Custom hooks
│── services/          # API calls
│── store/             # State management
│── utils/             # Helper functions
│── App.jsx
│── main.jsx
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/binyam69dev/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the development server

```bash
npm run dev
```

---

## 🔗 API Integration

This frontend communicates with the backend REST API:

* `POST /auth/login`
* `POST /auth/register`
* `GET /tasks`
* `POST /tasks`
* `PUT /tasks/:id`
* `DELETE /tasks/:id`

---

## 🧠 Key Concepts

* Component-based architecture
* Separation of concerns (UI vs API logic)
* Reusable UI components
* Optimistic UI updates for better UX

---

## 🚀 Build for Production

```bash
npm run build
```

---

## 📸 Screenshots (Optional)

*Add screenshots or GIFs here*

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---


## 👨‍💻 Author

Your Name – @binyam69dev
