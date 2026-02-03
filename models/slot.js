const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    slotNo: {
        type: Number,
        required: true,
        unique: true
    },
    isCovered: {
        type: Boolean,
        default: false
    },
    isEVCharging: {
        type: Boolean,
        default: false
    },
    isOccupied: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Slot", slotSchema);