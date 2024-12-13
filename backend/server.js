const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./database/database');
const { StartCronJobs } = require('./cronJobs');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use(cors());

readdirSync('./routes').map((route) => app.use('/api/v1/',  require('./routes/' + route)));

const connectServer = () => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    connectDatabase();
    StartCronJobs();
}
connectServer();


