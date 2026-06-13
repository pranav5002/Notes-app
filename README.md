# Full Stack Notes Application

A lightweight, full-stack note-taking application built as part of an internship assignment. This application allows users to seamlessly create, view, edit, and delete notes with real-time updates and full data persistence.

## 🚀 Project Structure
The repository is split into two independent sections:
* `/server` - Node.js + Express REST API (Backend)
* `/client` - React.js Application (Frontend)

---

## 🛠️ Getting Started & Installation

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your computer.

### 2. Backend Setup (`/server`)
Open your terminal, navigate to the server directory, install the dependencies, and start the local server:
```bash
cd server
npm install
npm start
```
*The backend server will run automatically on **port 5000**.*

### 3. Frontend Setup (`/client`)
Open a new terminal window, navigate to the client directory, install the required packages, and run the development app:
```bash
cd client
npm install
npm run dev
```
*Open [http://localhost:5173](http://localhost:5173) (or the port displayed in your terminal) to view it in your browser.*

---

## 🧠 Key Features Built
* **View Notes:** Displays all saved notes showing the title and an excerpt of the content.
* **Detailed View:** Click on any note to view its full text dynamically.
* **Create Note:** Form validation to easily add new notes with a title and content.
* **Edit Note:** Modify and update the title or body of existing notes.
* **Delete Note:** Instantly remove unwanted notes from the collection.
* **UX Enhancements:** Includes custom loading indicators and API error boundary text.

---

## 💻 Tech Stack & Architecture Decisions
* **Frontend:** React.js utilizing functional components alongside built-in hooks (`useState`, `useEffect`) for state management and handling side effects.
* **Backend:** Node.js paired with Express.js to construct an efficient REST API using standard HTTP status codes (200, 201, 400, 404).
* **Data Storage:** Structured as an in-memory database array to prioritize fast request-response cycles and simplicity.
* **Cross-Origin Resource Sharing:** Configured with `cors` middleware on the server to allow secure data fetching requests from the React application client.
