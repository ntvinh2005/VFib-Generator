const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/export', (req, res) => {
    const { data, filename } = req.body;
    const csvData = data.join(',') + '\n';
    fs.appendFile(`${filename}.csv`, csvData, (err) => {
        if (err) throw err;
        console.log(`Data appended to ${filename}.csv`);
    });
    res.send('Data exported successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});