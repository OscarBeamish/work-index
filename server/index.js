const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/getWorks', (req, res) => {
    const workDirectory = path.join(__dirname, '../public/work');
    
    if (!fs.existsSync(workDirectory)) {
        return res.status(404).send('Work directory not found.');
    }

    const folders = fs.readdirSync(workDirectory).filter(folder => {
        return fs.statSync(path.join(workDirectory, folder)).isDirectory();
    });

    const works = folders.map(folder => {
        const assets = fs.readdirSync(path.join(workDirectory, folder));
        return {
            title: folder,
            items: assets.map(asset => ({
                name: asset,
                type: path.extname(asset).substring(1),
                url: `/work/${folder}/${asset}`
            }))
        };
    });

    res.json(works);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
