const express = require('express');

const sequelize = require('./config');

const Book = require('./models/Book');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database prior to starting our server

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});