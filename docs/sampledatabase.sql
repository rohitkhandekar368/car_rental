-- Vehicle Categories
INSERT INTO VehicleCategory (VehicleCategoryID, CategoryName, Description)
VALUES (1, 'Sedan', 'Four-door passenger car'),
    (2, 'SUV', 'Sport Utility Vehicle'),
    (3, 'Truck', 'Light-duty truck');
-- Locations
INSERT INTO Locations (
        LocationsID,
        LocationName,
        Address,
        ContactPerson,
        ContactNumber
    )
VALUES (
        1,
        'Downtown Garage',
        '123 Main St, Cityville',
        'John Doe',
        '555-1234'
    ),
    (
        2,
        'Suburb Office',
        '456 Oak St, Townsville',
        'Jane Smith',
        '555-5678'
    );
-- Customers
INSERT INTO Customers (
        CustomersID,
        FirstName,
        LastName,
        Email,
        Phone,
        Address
    )
VALUES (
        1,
        'Alice',
        'Johnson',
        'alice@email.com',
        '555-1111',
        '789 Pine St, Villagetown'
    ),
    (
        2,
        'Bob',
        'Williams',
        'bob@email.com',
        '555-2222',
        '456 Elm St, Hamletville'
    );
-- Cars
INSERT INTO Cars (
        CarsID,
        Model,
        Brand,
        Year,
        RegistrationPlate,
        FuelType,
        Color,
        Status,
        VehicleCategoryID,
        LocationsID
    )
VALUES (
        1,
        'Camry',
        'Toyota',
        2022,
        'ABC123',
        'Gasoline',
        'Blue',
        'Available',
        1,
        1
    ),
    (
        2,
        'CRV',
        'Honda',
        2021,
        'XYZ456',
        'Hybrid',
        'Red',
        'Available',
        2,
        2
    );
-- Sample Records for Reservations without PaymentsID
INSERT INTO Reservations (
        ReservationsID,
        CustomersID,
        CarsID,
        PickupDate,
        ReturnDate,
        TotalCost,
        ReservationStatus
    )
VALUES (
        1,
        1,
        1,
        '2024-02-01 12:00:00',
        '2024-02-05 14:00:00',
        150.00,
        'Confirmed'
    ),
    (
        2,
        2,
        2,
        '2024-02-03 09:30:00',
        '2024-02-08 11:00:00',
        200.00,
        'Pending'
    );
-- Sample Records for Payments
INSERT INTO Payments (
        PaymentsID,
        ReservationsID,
        PaymentDate,
        Amount,
        PaymentMethod,
        PaymentStatus
    )
VALUES (
        1,
        1,
        '2024-01-25 10:00:00',
        50.00,
        'Credit Card',
        'Paid'
    ),
    (
        2,
        2,
        '2024-01-26 11:30:00',
        75.50,
        'PayPal',
        'Paid'
    );