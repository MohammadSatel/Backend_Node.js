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

# User Routes
- GET /api/users/profile - Get user profile and booking history
# Car Routes
- POST /api/cars - Add a new car (Admin only)
- GET /api/cars - Get all cars
- GET /api/cars/:id - Get a car by ID
- PUT /api/cars/:id - Update a car by ID (Admin only)
- DELETE /api/cars/:id - Delete a car by ID (Admin only)
- GET /api/cars/search - Search for cars with filters
# Booking Routes
- POST /api/bookings - Create a new booking
- GET /api/bookings - Get all bookings (Admin only)
- GET /api/bookings/:id - Get a booking by ID
- PUT /api/bookings/:id - Update a booking by ID (Admin only)
- DELETE /api/bookings/:id - Cancel/delete a booking

## Security
This application includes basic security features such as JWT based authentication, password hashing, and input validation.


User Routes:
Get User Profile

Method: GET
Endpoint: /api/users/profile
Description: Fetches the authenticated user's profile information.
Requires Authentication: Yes (use Bearer Token)
Update User Profile

Method: PUT
Endpoint: /api/users/update-profile
Description: Updates the authenticated user's profile information.
Requires Authentication: Yes (use Bearer Token)
Body: JSON payload with the fields you want to update (e.g., { "name": "New Name", "email": "newemail@example.com" })
Change User Password

Method: PUT
Endpoint: /api/users/change-password
Description: Allows the authenticated user to change their password.
Requires Authentication: Yes (use Bearer Token)
Body: JSON payload with the current and new password (e.g., { "currentPassword": "oldPassword123", "newPassword": "newPassword123" })
Authentication Routes:
User Signup

Method: POST
Endpoint: /api/auth/signup
Description: Registers a new user.
Body: JSON payload with user registration information (e.g., { "email": "user@example.com", "password": "password123", "name": "John Doe" })
User Login

Method: POST
Endpoint: /api/auth/login
Description: Authenticates a user and returns a token.
Body: JSON payload with user login credentials (e.g., { "email": "user@example.com", "password": "password123" })
Car Routes (assuming standard CRUD operations):
Get Cars

Method: GET
Endpoint: /api/cars
Description: Fetches a list of cars. (Assuming public access or authenticated users only based on your application's logic)
Add New Car

Method: POST
Endpoint: /api/cars
Description: Adds a new car to the listing.
Requires Authentication: Yes (for admin users, if applicable)
Body: JSON payload with car details (e.g., { "make": "Toyota", "model": "Corolla", "year": 2020 })
Booking Routes (assuming standard CRUD operations):
Create Booking
Method: POST
Endpoint: /api/bookings
Description: Creates a new booking for a car.
Requires Authentication: Yes
Body: JSON payload with booking details (e.g., { "carId": "carObjectId", "startDate": "2023-01-01", "endDate": "2023-01-05" })