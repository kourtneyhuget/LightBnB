const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require("pg");

const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "lightbnb"
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE users.email = $1;
  `;
  return pool.query(queryString, [email])
    .then(res => {
      if(res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
     })
     .catch (err => {
       console.log('query error:', err)
     });
};
  exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE users.id = $1;
  `;
  return pool.query(queryString, [id])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.log('query error:', err));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('query error:', err);
    })
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  const values = [guest_id, limit];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return console.log('query error: err');
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  // set up array to hold any parameters that may be available for the query
  const values = [];
  // start query with info that comes before the WHERE clause 
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews
  ON properties.id = property_id
  `;
  // check to see if city has been passed in as option (add city to params array and create WHERE clause for the city)
  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += ` WHERE city LIKE $${values.length} `;
  }

  if (options.owner_id) {
    values.push(options.owner_id);
    if(values.length === 1) {
      queryString += ` WHERE owner_id = $${values.length} `;
    } else {
      queryString += ` AND owner_id = $${values.length} `;
    }
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    values.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
    if (values.length === 2) {
      queryString += ` WHERE cost_per_night >= $${values.length - 1} AND cost_per_night <= $${values.length} `;
    } else {
      queryString += ` AND cost_per_night >= $${values.length - 1} AND cost_per_night <= $${values.length} `;
    }
  }

  queryString += `
  GROUP BY properties.id`

  if (options.minimum_rating) {
    values.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) >= $${values.length} `;
  }

  // add any query that comes after the WHERE clause
  values.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${values.length};
  `;

  console.log(queryString, values);

// run the query
  return pool.query(queryString, values)
    .then(res => {
      return res.rows
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
const queryString = `
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *;
`;
const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms]
return pool.query(queryString, values)
  .then(res => {
    return res.rows
  })
  .catch(err => {
    return console.log('query error:', err)
  })
};
exports.addProperty = addProperty;