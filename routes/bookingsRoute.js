const express = require('express');
const router = express.Router();
const booking = require("../models/bookingModel")
const Car = require("../models/carModel")
const { v4: uuidv4 } = require('uuid');

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await booking.find().populate('car')
        res.send(bookings)
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router