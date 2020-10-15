INSERT INTO users (name, email, password)
VALUES ('Kourtney Huget', 'khuget@khuget.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Paige Lindahl', 'plindahl@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Saad Islam', 'sislam@icloud.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Happy Place', 'description', 'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 1000, 2, 4, 5, 'Canada', 'happy street', 'Calgary', 'Alberta', 'T2S 3J6', true),
(1, 'Dream Place', 'description', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 2000, 2, 6, 8, 'Canada', 'dream street', 'Calgary', 'Alberta', 'T3S 3K6', true),
(3, 'Escape Place', 'description', 'https://images.pexels.com/photos/5546512/pexels-photo-5546512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 3000, 1, 3, 5, 'Canada', 'escape street', 'Calgary', 'Alberta', 'T4S 3M6', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 1, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 6, 'That a great place to stay!'),
(3, 2, 2, 8, 'This place is SERIOUSLY a DREAM!'),
(2, 3, 1, 4, 'Was not what we were expecting... needs to be cleaned better!');


