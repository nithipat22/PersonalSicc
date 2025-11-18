const express = require('express')
const app = express()
const port = process.env.PORT_SERVER
const routes = require('./routes/routes')

app.use(express.json())
app.use(express.static('public'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use('/api', routes)


app.listen(port, () => {
    console.log(`app on http://localhost:${port}`)
})

