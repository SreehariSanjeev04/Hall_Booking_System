# Admin Dashboard

This is a React-based admin dashboard for booking management. The dashboard provides analytics features like viewing booking trends with charts and monitoring the number of bookings and pending requests. The project also includes authentication using JWT (JSON Web Tokens) and role-based access control (RBAC) to restrict access based on user roles.

## Features

- **Booking Analytics**: Visualizes booking trends over time using **Chart.js**.
- **Total Bookings & Pending Requests**: Displays the total number of bookings and the count of pending requests.
- **Role-Based Access Control (RBAC)**: Admins and users have different access levels.
- **JWT Authentication**: Secure login system with JWT to manage sessions.

## Technologies Used

- **React.js**: Frontend library for building UI components.
- **Chart.js**: A JavaScript library for creating dynamic charts.
- **JWT (JSON Web Tokens)**: Used for authentication and session management.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **React Router**: For routing within the application.
- **Node.js/Express**: Backend API to handle authentication, JWT issuance, and role-based access control.

## Installation

### Prerequisites
Make sure you have **Node.js** and **npm** installed.

1. Clone the repository:
    ```bash
    git clone https://github.com/SreehariSanjeev04/Hall_Booking_System
    ```

2. Navigate to the project folder:
    ```bash
    cd hall_booking_system
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Visit `http://localhost:5173` in your browser to access the dashboard.

## JWT Authentication

The application uses **JSON Web Tokens (JWT)** for user authentication. Users must log in to access the dashboard. JWT tokens are sent to the client upon successful login and stored locally (e.g., in localStorage or cookies). Each request to the backend API requires a valid JWT token for authentication.

### JWT Login Flow

1. **Login**: Users provide their credentials (username/email and password).
2. **Token Issuance**: On successful authentication, a JWT token is issued.
3. **Accessing Protected Routes**: The JWT token is sent as an `Authorization` header (`Bearer <token>`) for accessing protected routes (like the dashboard).
4. **Token Expiry**: Tokens have an expiration time, after which the user must log in again to obtain a new token.

## Role-Based Access Control (RBAC)

The application uses **Role-Based Access Control (RBAC)** to restrict access to certain routes and features based on the user's role. Two primary roles are defined:

- **Admin**: Has full access to all features, including analytics and viewing all booking information.
- **User**: Can view their own bookings but does not have access to analytics or other admin features.

### Admin Role

Admins have access to:

- **Analytics Dashboard**: View total bookings, pending requests, and booking trends over time.
- **Booking Management**: Ability to manage all bookings (approve, reject, etc.).

### User Role

Users have access to:

- **View Personal Bookings**: View and manage their own bookings.

RBAC is enforced both on the frontend (by hiding/showing elements based on user role) and on the backend (by checking the role in the JWT payload before allowing access to protected routes).

## Chart.js Integration

**Chart.js** is used to render dynamic charts for booking trends. The data for the charts is retrieved from the backend and displayed in the admin dashboard.

### Example Chart

The `Booking Trends` chart visualizes the number of bookings over time:

- **Data**: The chart is populated with dates (from the booking data) on the x-axis and the count of bookings for each date on the y-axis.
- **Responsive**: The chart is responsive and adjusts based on the screen size to provide a good viewing experience across devices.

