const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//t doll refers to 'tactical doll'
//can search for individual dolls by name or ID, and for all dolls of a type by type name
const tDollSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ['HG', 'SMG', 'AR', 'RF', 'MG', 'SG'],
    },
    id: {
        type: String,
    },
});

module.exports = mongoose.model('TDolls', tDollSchema);
