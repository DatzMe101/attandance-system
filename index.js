const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
