const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "songs";`;
    pool.query(queryText).then((result) => {
        console.log("GET result worked");
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error making query', error);
        res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
    console.log("HELLO FROM THE POST", req.body);
    let newSong = req.body;
    let queryText = `INSERT INTO "songs" ("rank", "artist", "track", "published")
        VALUES (${newSong.rank}, '${newSong.artist}', '${newSong.track}', '${newSong.published}');`;
        console.log(queryText)
    pool.query(queryText).then((result) => {
        console.log("POST result", result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error making query', error);
        res.sendStatus(500)
    })
})

module.exports = router;