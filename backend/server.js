const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utilities/db');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
    }));
app.use(bodyParser.json());
app.use(cookieParser());
dbConnect()

app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/dashboard/categoryRoutes'));

app.get('/', (req, res) => {
    res.send('Hello World from my server!');
    });

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
