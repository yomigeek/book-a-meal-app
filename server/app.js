const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const app = express();
const port = process.env.PORT || 3000;
const serve = app.listen(port);
app.use(bodyParser.json());

app.use(require('./routes/index'));

app.listen(port , () => { console.log('Server started on port 3000'); });

module.exports = app;
module.exports = serve;
