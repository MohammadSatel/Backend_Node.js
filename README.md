## Car Rental Application - Backend
This project is the backend part of a Car Rental Application, built using Node.js and Express, and connected to MongoDB for data persistence. The backend handles user authentication, car management, bookings, and user profiles.

## Features
User Authentication
Signup: Users can register by providing a username, email, and password.
Login: Users can log in using their credentials to receive a JSON Web Token (JWT) for authenticated sessions.
Profile Management: Users can view their profile information and booking history.
Car Management
Car Listing: Admins can add new cars to the listing, which includes details like make, model, year, and rental price per day.
Car Availability: Availability of cars is automatically managed based on bookings.
Booking System
Create Booking: Users can book cars based on availability for specified dates.
View Booking: Users can view their current and past bookings.
Booking Validation: The system prevents double bookings and ensures car availability.
Admin Features
Admin Dashboard: Special routes for admins to manage cars, users, and bookings.
Role-Based Access Control: Different levels of permissions for admins and regular users.
Getting Started
Prerequisites
Node.js
MongoDB
npm

## API Endpoints
Auth Routes
POST /api/auth/signup - Register a new user
POST /api/auth/login - Login a user
User Routes
GET /api/users/profile - Get user profile and booking history
Car Routes
POST /api/cars - Add a new car (Admin only)
GET /api/cars - Get all cars
Booking Routes
POST /api/bookings - Create a new booking

## Security
This application includes basic security features such as JWT based authentication, password hashing, and input validation.