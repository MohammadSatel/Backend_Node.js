http://localhost:3000/


## homepage (GET)
http://localhost:3000/


## signup (POST)
http://localhost:3000/api/auth/signup
{
  "username": "yourUsername",
  "email": "yourEmail@example.com",
  "password": "yourPassword"
}


## login (POST)
http://localhost:3000/api/auth/login
{
  "email": "yourEmail@example.com",
  "password": "yourPassword"
}


## cars (GET)
http://localhost:3000/api/cars


## create cars (POST)
http://localhost:3000/api/cars
{
  "make": "Bmw",
  "model": "X6M",
  "year": 2020,
  "pricePerDay": 250
}


## new booking (POST)
http://localhost:3000/api/bookings/
{
  "user": "userObjectId",
  "car": "carObjectId",
  "startDate": "2024-01-01",
  "endDate": "2024-01-05"
}

