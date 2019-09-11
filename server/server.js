const express = require('express');
const bodyParser = require( 'body-parser' );

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use( bodyParser.urlencoded( { extended: true } ) )

let musicRouter = require('./routes/music_router');
app.use('/musicLibrary', musicRouter);


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});