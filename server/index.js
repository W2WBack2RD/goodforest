const express = require('express');
var cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
require('./config/environment');
require('dotenv').config({ path: path.join(__dirname, '../.env') })
require('./database');

const routes = require('./routes/index');
const configPassport = require('./passport/passport-config');

const assetFolder = path.resolve(__dirname, '../dist/');
const port = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.static(assetFolder));
app.use(bodyParser.json());

configPassport(app, express);

app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));