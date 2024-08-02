const { ConnectDB } = require('./Database/database.js');
const express = require('express');
const app = express();
const path = require('path');
const router = require('./Routes/route.js');

const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 8000; // Changed `port` to `PORT` to match common convention

app.use('/', router);

// for deployment
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function (error) {
        if (error) {
            res.status(500).send(error);
        }
    });
});

// end

app.get('/', (req, res) => {
    res.send("HI ABEEHA");
});

ConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
