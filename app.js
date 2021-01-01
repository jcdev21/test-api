const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

// plugins
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());

// database
const db = require('./src/configs/db');
db.authenticate().then(() => console.log('Connect in Database'));

// routers
const userRouter = require('./src/routes/UserRoutes');
app.use('/api/v1/users', userRouter);
const authRouter = require('./src/routes/AuthRoutes');
app.use('/api/v1/auth', authRouter);
const personalRouter = require('./src/routes/PersonalRoute');
app.use('/api/v1/personal', personalRouter);

app.use('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    return res.send(`
        <h3>IT TEST API</h3>
        <p>
            Endpoint : <br/>
                ${req.get('host')}/api/v1/auth/login (POST) <br />
                ${req.get('host')}/api/v1/auth/register (POST) <br />
                ${req.get('host')}/api/v1/users (GET) <br />
                ${req.get('host')}/api/v1/users/:id (GET) <br />
                ${req.get('host')}/api/v1/personal (GET)
        </p>
    `);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running is port ${PORT}`));