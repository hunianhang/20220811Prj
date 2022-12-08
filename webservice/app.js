const express = require('express')
const bodyParser = require('body-parser')
const app = module.exports = express();
app.use(bodyParser.json())

const config = require('config');
const port = config.get('port') || 9000;

const cors = require('cors');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', cors())
app.use(cors());

app.use(require('./middleware/neo4j-type-handler'))

app.use(require('./routes'));

app.use(require('./middleware/neo4j-error-handler'))

app.listen(port, () => {
  console.log(`Service Running On Port: ${port}!`)
});