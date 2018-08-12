let mongoose = require('mongoose');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('./config/DB');
const user_routes = require('./routes/user.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(() => {
    console.log('Database is connected')
  }, err => {
    console.log('Can not connect to the database' + err)
  }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/user', user_routes);

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});
