/* const {Router} = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const stripe = require('stripe')('pk_test_51M9XuxGYrPg1epLHWriPuU5Cgd52f12UgzXLfJ7VigsN2Wkn1d9p4wq9U2QZJRueq6sKqRUITTxsPTsDHvcGfHRM00fwmZ8ibo')

let url = "http://localhost:4000";
// let url = "https://api.rora-atx.com";

router.post("/payment", async(req, res)=>{
    const {product} = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[
            {
                price_data: {
                    currency: "inr",
                    product_data:{
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: product.amount * 100
                },
                quantity: product.quantity,
            }
        ],
        mode: "payment",
        success_url: `${url}/mystuff`,
        cancel_url: `${url}/`
    })

    res.redirect(303, session.url);
    res.json({id:session.id});
})

module.exports = router; */


const express = require("express");

const stripeAPI = require("stripe")(
  //"sk_test_yqY1HGxVIfTXjyznM1mvt6Cc00rN6niIhc"
  "sk_test_51M9XuxGYrPg1epLH8XoNNTOyERnVesy3oqwyIY4Z5Ml0M4BrHbxVPTRaUlJ5t8PqfkO9PCiIuGCOnxvK3lK9AVkv00eHpzlHii"
);

module.exports = stripeAPI;
