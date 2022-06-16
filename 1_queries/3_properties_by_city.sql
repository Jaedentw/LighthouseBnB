SELECT properties.id, title, cost_per_night, AVG(p_r.rating) AS average_rating
FROM properties
JOIN property_reviews AS p_r
ON properties.id = p_r.property_id
WHERE city LIKE '%' || 'Vancouver' || '%'
GROUP BY properties.id
HAVING AVG(p_r.rating) >= 4
ORDER BY cost_per_night
LIMIT 10
;