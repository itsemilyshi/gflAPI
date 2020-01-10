const mongoose = require('mongoose');
require('../models/gflModel')

TDoll = mongoose.model('TDolls');

module.exports.list_all_dolls = (req, res) => {
    TDoll.find({}, (err, doll) => {
        if (err){
            res.send(err);
        }
        res.json(doll);
    })
};

module.exports.list_all_dolls_type = (req, res) => {
    TDoll.find(req.params.type, (err, doll) => {
        if (err){
            res.send(err);
        }
        res.json(doll);
    })
};

module.exports.read_doll = (req, res) => {
    TDoll.find(req.params.id, (err, doll) => {
        if (err){
            res.send(err);
        }
        res.json(doll);
    })
};

module.exports.create_doll = (req, res) => {
    const newDoll = new TDoll(req.body);
    newDoll.save((err, doll) => {
        if (err) {
            res.send(err);
        }
        res.json(doll);
    })
};

module.exports.update_doll = (req, res) => {
    TDoll.findOneAndUpdate({id: req.params.id}, req.body, (err, doll) => {
        if (err) {
            res.send(err);
        }
        res.json(doll);
    })
};

module.exports.delete_doll = (req, res) => {
    TDoll.remove({id: req.params.id}, (err, doll) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "Successfully deleted"})
    })
};
