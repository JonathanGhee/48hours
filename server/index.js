const express = require('express');
const cors = require('cors');
const db = require('../database/index.js')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  for(let i in req.body) {
    db.save(req.body[i])
    .catch(err => console.error(err))
  }
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});