const express = require('express');
const mongoose = require('./api/db/mongoose');
const route = require('./api/routes/gflRoutes');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(route);


app.listen(port, () => {
    console.log('GFL API server running on port ' + port)
});
