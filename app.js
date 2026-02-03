const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const slotRoutes = require("./routes/slot");

const app = express();

// ================== MongoDB Connection ==================
const DB_URL = "mongodb://127.0.0.1:27017/smartParking";

mongoose.connect(DB_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================== View Engine ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================== Middleware ==================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ================== Routes ==================
app.use("/slots", slotRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Smart Parking System Running 🚗");
});

// ================== Server ==================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});