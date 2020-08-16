const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.post('/clicks', async function(request, response) {
  const allInformation = request.body;
  console.log(allInformation.id);

  const result = await db.query(
    `INSERT INTO clicks (userId, clickX, clickY, tracking, target, time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      allInformation.id,
      allInformation.clickX,
      allInformation.clickY,
      allInformation.tracking,
      allInformation.target,
      allInformation.time,
    ]
  );
  console.log(result);

  response.json({ clicks: 'tracked' });
});

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    clickX VARCHAR(150) NOT NULL,
    clickY VARCHAR(150) NOT NULL,
    tracking VARCHAR(150) NOT NULL,
    target VARCHAR(150) NOT NULL,
    time VARCHAR(150) NOT NULL 
  );
`);

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
