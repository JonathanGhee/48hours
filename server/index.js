const express = require('express');

const Samples= require('./database/index.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});