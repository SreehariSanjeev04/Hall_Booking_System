# Hall Booking System

## Overview

The Hall Booking System is a web application that allows users to book halls for events. It includes features such as user login, role-based access control (admin and user roles), viewing bookings, managing booking requests, and analyzing booking data.

This project utilizes React for the frontend, Node.js and Express for the backend, and MongoDB for the database.

## Features

- **Authentication**: Role-based access control using JWT authentication for secure login and session management.
- **User Dashboard**: Displays user-specific data, including bookings and booking requests.
- **Admin Dashboard**: Admin users can view all booking requests, and analytics about booking trends.
- **Booking Management**: Users can make booking requests, and admins can approve or reject requests.
- **Real-time Analytics**: Admins can view trends in booking data over time, with visual representation using charts.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For handling routing and navigation.
- **Chart.js**: For rendering booking trends with charts.
- **Tailwind CSS**: For styling the application with utility-first CSS.

### Backend
- **Node.js**: JavaScript runtime for the server-side logic.
- **Express.js**: Web framework for building the backend API.
- **MongoDB**: NoSQL database for storing user and booking data.

### Authentication
- **JWT (JSON Web Tokens)**: For user authentication and session management.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB instance running locally or using a cloud service like MongoDB Atlas.

### Clone the Repository

```bash
git clone https://github.com/SreehariSanjeev04/Hall_Booking_System
cd Hall_Booking_System
npm start
```
# Features
## User Authentication
Login: Users can log in with a username, password, and roll number.
Role-based Access Control: Users are assigned different roles (e.g., user, admin). Only admins can view all booking requests and analytics.
## Admin Dashboard
Analytics: Admins can view trends over time for bookings using a Line chart generated by Chart.js.
Manage Requests: Admins can approve or reject booking requests.
User Management: Admins can manage users and their roles.
## User Dashboard
Booking Overview: Users can view their booking requests and see the status (approved, pending, rejected).
Request New Booking: Users can submit new booking requests which will be approved by an admin.

# Challenges

Multiple challenges were faced while developing the website such as minimizing reads and writes to the database to make it cost effective and implementing the access control system which juggling issues with state management. Design could have been improved with light/dark mode but functionality is the main goal.