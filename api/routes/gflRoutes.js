const gfl = require('../controllers/gflController');
const express = require('express');
const router = new express.Router();
const TDoll = require('../models/gflModel');
const TDollPost = require('../models/postDollModel');

// if this doesn't work properly, it is time to borrow code from the modify customer email/phone stuff where all
// operations go through a get request first in order to see if they exist or not

//also make it so that you can just GET the info for a doll by going to /tdoll/:id

//post
// this can successfully create stuff in mongodb
// if there already exists a tdoll with the same ID, it will just do a patch instead
router.post('/tdolls', async (req, res) => {
    const tDoll = new TDollPost({
        ...req.body,
    });
    try {
        const finddoll = await TDollPost.findOne({id: req.body.id});
        if (!finddoll) {
            tDoll.save();
            res.status(201).send(tDoll)
        }
        else {
            TDollPost.findOneAndUpdate({id: req.body.id}, req.body, {new: true}, (err, doc) => {
                if (err) {
                    res.send(500, {error: err})
                }
                console.log(doc);
                return res.status(200).send(doc)
            })
        }
    } catch (e) {
        res.status(400).send(e + "error")
    }
});

// get all depending on req.body
// this works
// if you are specific enough eg. give the ID no. then it will return just one doll, else it will return all that
// fit the criteria eg. HG will return all HG units
router.get('/tdolls', async (req, res) => {
    try {
        await TDoll.find(req.body, (err, doll) => {
            if (err){
                res.send(err);
            }
            res.status(201).send(doll)
        })
    } catch (e) {
        res.status(500).send()
    }
});

//get one by name or index ID
// this work
router.get('/tdolls/:id', async (req, res) => {
    try {
        const tdoll = await TDollPost.findOne( {id: req.params.id} )
        if (!tdoll) {
            return res.status(404).send("not found") // this handles the promise rejection stuff
        }
        res.status(200).send(tdoll)
    } catch (e) {
        res.status(500).send('error')
    }
});

// update one
// this works
router.patch('/tdolls/:id', async (req, res) => {
    try {
        const tdoll = await TDoll.findOne({id: req.params.id});

        if (!tdoll) {
            return res.status(404).send('Update failed, could not find tdoll')
        }
        if (tdoll.id !== req.body.id) {
            return res.status(400).send('Cannot modify ID')
        }
        TDollPost.findOneAndUpdate({id: req.params.id}, req.body, {new: true}, (err, doc) => {
            if (err) {
                res.send(500, {error: err})
            }
            console.log(doc);
            return res.status(200).send(doc)
        })
    } catch (e) {
        res.status(400).send(e + "oh no")
    }
});

//its the same thing, but you can also put the request in the body and not the query parameters
router.patch('/tdolls', async (req, res) => {
    try {
        const tdoll = await TDoll.findOne({$or: [{id: req.body.id}, {name: req.body.name} ]});

        if (!tdoll) {
            return res.status(404).send('Update failed, could not find tdoll')
        }
        if (tdoll.id !== req.body.id) {
            return res.status(400).send('Cannot modify ID')
        }
        TDollPost.findOneAndUpdate({id: req.body.id}, req.body, {new: true}, (err, doc) => {
            if (err) {
                res.send(500, {error: err})
            }
            console.log(doc);
            return res.status(200).send(doc)
        })
    } catch (e) {
        res.status(400).send(e + "oh no")
    }
});

// delete: this works correctly
router.delete('/tdolls', async (req, res) => {
    try {
        const task = await TDoll.findOneAndDelete({ id: req.body.id })

        if (!task) {
            res.status(404).send('not found')
        }

        res.status(200).send('Deleted the following: ' + task)
    } catch (e) {
        res.status(500).send('server error')
    }
});


module.exports = router;
