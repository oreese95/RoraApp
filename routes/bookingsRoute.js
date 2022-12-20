const express = require('express');
const router = express.Router();
const booking = require("../models/bookingModel")
const Car = require("../models/carModel")
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")('sk_test_51M9XuxGYrPg1epLH8XoNNTOyERnVesy3oqwyIY4Z5Ml0M4BrHbxVPTRaUlJ5t8PqfkO9PCiIuGCOnxvK3lK9AVkv00eHpzlHii')

router.post("/bookcar" , async(req,res) =>{

    const {token} = req.body
    console.log(token)
    try {
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id 
        })

        const payment = await stripe.charges.create({
            amount : Math.round(req.body.total * 100),
            currency : 'usd' ,
            customer : customer.id ,
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        })

        if(payment){
            req.body.transactionID = payment.source.id
            const newbooking = new booking(req.body)
            await newbooking.save()
            const car = await Car.findOne({_id : req.body.car})
            car.bookedTimeSlots.push(req.body.bookedTimeSlots)

            await car.save()
            res.send('Your booking is Successful')
        }
        else{
            return res.status(400).json(error);
        }

        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }

});

router.get("/getallbookings" , async (req, res) => {
    try {
        const bookings = await booking.find().populate('car')
        res.send(bookings)
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router