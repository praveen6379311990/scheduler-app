CREATE DATABASE scheduler;
USE scheduler;

CREATE TABLE time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT 0
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_id INT UNIQUE,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (slot_id) REFERENCES time_slots(id)
);
