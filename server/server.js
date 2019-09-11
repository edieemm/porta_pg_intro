const express = require('express');
const bodyParser = require( 'body-parser' );
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'music_library',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('postgressql connected')
});

pool.on('error', (error) => {
    console.log('Error with postgres pool: ', error)
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use( bodyParser.urlencoded( { extended: true } ) )

// let musicRouter = require('./routes/music_router');
// app.use('/musicLibrary', musicRouter);

app.get('/musicLibrary', (req, res) => {
    let queryText = `SELECT * FROM "songs";`;
    pool.query(queryText).then((result) => {
        console.log("RESULTS!!!!!!", result);
        res.send(result.rows);
    })
    
});


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});