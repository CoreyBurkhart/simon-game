const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
let app = express();

app.get('/', function(req, res) {
  res.render(__dirname + 'build/index.html');
});

app.listen(PORT, function() {
  console.log('Listening');
})
