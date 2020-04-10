const Datastore = require('nedb')
const express   = require('express')
const bparser   = require('body-parser')
const cors      = require('cors')
const db        = new Datastore({ filename: './tryxdb.json', autoload: true })
const app       = express()

app.use( cors() )
app.use( bparser.json() )
app.use( express.static('dist/') )

app.post( '/getall', (req, res) => {
    db.find({}, (err, docs) => {
        res.send( err
            ? { err }
            : docs
        )
    })
} )

app.post( '/insert', (req, res) => {
    db.insert({ id: req.body.i1 }, (err, newDoc) => {
        db.find({}, (errget, docs) => {
            res.send( err
                ? { err }
                : docs
            )
        })
    })
} )

app.listen( 3002, () => console.log( `listening` ) )