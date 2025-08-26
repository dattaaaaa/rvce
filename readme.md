# Project Nexus: An Integrated Campus Management System

**Project Nexus** is a modern, web-based platform engineered to centralize and simplify the academic and administrative operations of an educational institution. It offers tailored dashboards and powerful tools for four core user roles: **Admins**, **Professors**, **Students**, and **Recruiters**. This system enhances efficiency in user and course management, revolutionizes attendance with facial recognition, and streamlines the entire lifecycle of academic assessment and recruitment.

## ✨ Core Features

### 👨‍💼 Admin Portal
* **Centralized User Control**: Seamlessly create, manage, and remove user accounts for all roles.
* **Dynamic Course Catalog**: Effortlessly add, update, and organize academic courses.
* **Intelligent Enrollment System**: Precisely assign students and faculty to their respective courses.

### 👩‍🏫 Professor's Hub
* **Interactive Class Rosters**: Access detailed views of assigned courses and enrolled students.
* **AI-Powered Attendance**:
    * Securely register student facial data for biometric verification.
    * Conduct real-time, automated attendance sessions via webcam.
* **Assessment Management**: Design and schedule examinations (CIE/SEE), specifying venues, timings, and durations.
* **Gradebook & Results**: Efficiently upload, manage, and publish student marks and academic results.

### 🧑‍🎓 Student Gateway
* **Simplified Course Registration**: Browse the course catalog and enroll with ease.
* **Examination Hub**: Stay informed with a personalized schedule of upcoming tests, complete with an integrated Google Map for locating venues.
* **Academic Dashboard**: Instantly view grades, results, and overall academic progress.
* **Personal Profile**: Manage and update personal and academic details.

### 🕵️ Recruiter's Console
* **Advanced Talent Search**: Utilize powerful filters to find student candidates based on academic performance, skills, and more.
* **Comprehensive Student Profiles**: Gain access to in-depth student profiles to inform hiring decisions.

## 💻 Technology Stack

* **Frontend**: React, `face-api.js` for facial recognition, `zustand` for state management, `axios` for API requests.
* **Backend**: Node.js, Express.js for a robust RESTful API.
* **Database**: MongoDB for a flexible, scalable data store.
* **Authentication**: Secure, token-based authentication using JSON Web Tokens (JWT).

##  Prerequisites

Ensure your development environment meets the following requirements:

* [Node.js](https://nodejs.org/) (includes npm)
* [MongoDB](https://www.mongodb.com/try/download/community) (running as a service)

## 🚀 Getting Started

Follow these instructions to get a local instance of Project Nexus up and running.

### Server-side Installation

1.  **Navigate to the server directory**:
    ```bash
    cd twemp/server
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the `twemp/server` directory.
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```
    *Replace the placeholder values with your actual MongoDB connection URI and a strong JWT secret.*

### Client-side Installation

1.  **Navigate to the client directory**:
    ```bash
    cd twemp/client
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env` file in the `twemp/client` directory.
    ```env
    REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```
    *Replace the placeholder with your Google Maps Embed API key.*

## ▶️ Launching the Application

### Start the Backend Server

In the `twemp/server` directory, execute:
```bash
npm start