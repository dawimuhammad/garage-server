## Garage REST API

###  REST API.

#### List of Garage routes:

ROUTE  |  HTTP  | Description | Requirement
-------|--------|-------------|-------------
/garage/ | POST | Create a garage data | body (name, address, phone, email, maxCars)
/garage/find/all | GET | Get all garages data | -
/garage/find/:garageId | GET | Get a single garage data by it's ID | garage id through url parameter
/garage/:carId | PUT | Update a garage data | garage id through url parameter, body (name, address, phone, email, maxCars)
/garage/:carId | DELETE | Delete a garage data by it's ID | garage id through url parameter

#### List of Car routes:

ROUTE  |  HTTP  | Description | Requirement
-------|--------|-------------|-------------
/cars/ | POST | Create a car data | body (brand, model, year, color, mileage, engine, power, registration_date, price, image_url)
/cars/find/ | GET | Get a car data by it's model name | body (keyword)
/cars/find/all | GET | Get all cars data | -
/cars/find/:carId | GET | Get a single car data by it's ID | car id through url parameter
/cars/:carId | PUT | Update a car data | car id through url parameter, body (brand, model, year, color, mileage, engine, power, price, image_url)
/cars/:carId | DELETE | Delete a car data by it's ID | car id through url parameter


### Usage

#### With npm (node package manager):

```
clone repository

npm install

npm start

```

#### Testing using Insomnia/ Postman using url http://localhost:3000

#### Access through browser website via http://localhost:3000