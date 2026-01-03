# Scheduler App

A simple meeting scheduler built using **React (Vite)** and **PHP + MySQL**.

## Features
- Select date
- View available time slots
- Book a slot with validation
- Prevent double booking
- Responsive UI

## Tech Stack
- Frontend: React + Vite
- Backend: PHP (REST APIs)
- Database: MySQL

## Setup

### Backend
1. Place project inside `htdocs`
2. Import `migrate.sql` into MySQL
3. Start Apache & MySQL (XAMPP)
4. Backend URL:
   http://localhost/scheduler-app/backend/api/get-slots.php

### Frontend
```bash
cd frontend
npm install
npm run dev
