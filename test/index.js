const express = require("express");
const axios = require('axios');
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

app.get('/', (res, req) => {
    axios.get('http://localhost:8080/user/1')
  .then(response => {
    console.log(response.data);
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

})


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
