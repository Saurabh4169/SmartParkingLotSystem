const express = require("express");
const router = express.Router();
const Slot = require("../models/slot");


// ================= SHOW FORM TO ADD SLOT =================
router.get("/new", (req, res) => {
    res.render("slots/new");
});


// ================= ADD SLOT TO DB =================
router.post("/", async (req, res) => {
    try {
        const { slotNo, isCovered, isEVCharging } = req.body;

        const newSlot = new Slot({
            slotNo,
            isCovered: isCovered === "on",
            isEVCharging: isEVCharging === "on"
        });

        await newSlot.save();
        res.redirect("/slots");
    } catch (err) {
        res.send("Error adding slot: " + err.message);
    }
});


// ================= VIEW ALL SLOTS =================
router.get("/", async (req, res) => {
    const slots = await Slot.find().sort({ slotNo: 1 });
    res.render("slots/index", { slots });
});


// ================= PARK VEHICLE FORM =================
router.get("/park", (req, res) => {
    res.render("slots/park", { message: null });
});


// ================= HANDLE PARK VEHICLE =================
router.post("/park", async (req, res) => {
    const needsEV = req.body.needsEV === "on";
    const needsCover = req.body.needsCover === "on";

    const slot = await Slot.findOne({
        isOccupied: false,
        ...(needsEV && { isEVCharging: true }),
        ...(needsCover && { isCovered: true })
    }).sort({ slotNo: 1 });

    if (!slot) {
        return res.render("slots/park", { message: "❌ No slot available" });
    }

    slot.isOccupied = true;
    await slot.save();

    res.render("slots/park", { message: `✅ Vehicle parked at Slot ${slot.slotNo}` });
});


// ================= REMOVE VEHICLE FORM =================
router.get("/remove", (req, res) => {
    res.render("slots/remove", { message: null });
});


// ================= HANDLE REMOVE VEHICLE =================
router.post("/remove", async (req, res) => {
    const { slotNo } = req.body;

    const slot = await Slot.findOne({ slotNo });

    if (!slot) {
        return res.render("slots/remove", { message: "❌ Slot not found" });
    }

    if (!slot.isOccupied) {
        return res.render("slots/remove", { message: "⚠️ Slot is already empty" });
    }

    slot.isOccupied = false;
    await slot.save();

    res.render("slots/remove", { message: `✅ Slot ${slotNo} is now free` });
});


module.exports = router;