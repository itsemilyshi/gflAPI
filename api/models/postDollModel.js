const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    skill: [
        {
            name: String,
            description: String,
            initCD: Number,
            CD: Number,
            MODskill: Boolean,
            skillType: String,
        }
    ],
    stats: {
            health: Number,
            damage: Number,
            accuracy: Number,
            evasion: Number,
            rof: Number,
            speed: Number,
            armor: Number,
            critRate: Number,
            critDamage: Number,
            armorPen: Number,
    },
    tiles: [
        {
        buffTiles: {
            type: Array
        },
        referenceTile: Number,
        buffs: {
            damage: Number,
            accuracy: Number,
            evasion: Number,
            rof: Number,
            armor: Number,
            critRate: Number,
            critDamage: Number,
        }
        }
        ]
});

module.exports = mongoose.model('tdolls', tDollSchema);
