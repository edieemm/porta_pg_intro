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
        VALUES ($1, $2, $3, $4);`;

    console.log(queryText)
    pool.query(queryText, [newSong.rank, newSong.artist, newSong.track, newSong.published])
    .then((result) => {
        console.log("POST result", result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error making query', error);
        res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
    console.log('deletes are talking! & sent back', req.params.id)
    let queryText = `DELETE FROM "songs" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log("DELETE result", result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error making query', error);
            res.sendStatus(500)
        })
})

module.exports = router;