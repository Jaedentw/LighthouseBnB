const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lighthousebnb'
});

//Get a single user from the database given their email
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch(() => {
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;


//Get a single user from the database given their id.
const getUserWithId = function(id) {
  return pool
    .query(`SELECT id FROM users WHERE id = $1;`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch(() => {
      return null;
    });
};
exports.getUserWithId = getUserWithId;


//Add a new user to the database.
const addUser =  function(user) {
  return pool
    .query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) RETURNING *;`,
    [user.name, user.email, user.password])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err.message;
    });
};
exports.addUser = addUser;


//Get all reservations for a single user.
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
    SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2`,
    [guest_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err.message;
    });
};
exports.getAllReservations = getAllReservations;


//Get all properties. Refactored
const getAllProperties = (options, limit = 10) => {
  let queryParams = [];
  let queryText = `SELECT properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryText += `WHERE city LIKE $${queryParams.length} `;
  }
  
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryText += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryText += `AND (cost_per_night / 100) > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryText += `AND (cost_per_night / 100) < $${queryParams.length} `;
  }

  queryText += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryText += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryText += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryText, queryParams);

  return pool
    .query(queryText, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err.message;
    });
};
exports.getAllProperties = getAllProperties;


//Add a property to the database
const addProperty = function(property) {
  return pool
    .query(`
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,
    [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err.message;
    });
};
exports.addProperty = addProperty;
