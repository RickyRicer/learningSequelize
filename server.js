const express = require('express');

const sequelize = require('./config');

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Connect to the database prior to starting our server

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});