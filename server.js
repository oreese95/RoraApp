const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const dbConnection = require("./db");
//app.use(express.json());
app.use((req, res, next) => {
  if (req.originalUrl.includes("/webhook")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cors());
const stripe = require("./routes/stripeRoute");
const { bookCar } = require("./routes/bookingsRoute");

app.use("/api/cars/", require("./routes/carRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));

// const path = require("path");
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//   });
// }

let reqobj;
let url = "http://localhost:4000";
 //let url = "https://api.rora-atx.com";


app.post("/stripe-checkout", async function createCheckoutSession(req, res) {
    console.log(" here from create session");
    //console.log(req.body);
    reqobj = new Object(req.body.obj);
    //console.log(req.body);
    console.log(reqobj);
    let session;
    try {
        const customer = await stripe.customers.create({
            email: req.body.customer_email,
            name: req.body.user_name,
            source: req.body.id
        })
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        //customer: customer.id,
        customer_email: customer.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: req.body.name,
                description: req.body.description,
                images: [req.body.images],
              },
              unit_amount: (req.body.unit_amount * 100)
            },
  
            quantity: 1,
          },
        ],
        success_url: `${url}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/booking/${req.body.car_id}`,
      });
      //console.log(session);
      res.status(200).json({ url: session.url });
      console.log(session.url);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: "an error occured,unable to create session" });
    }
  }); 
  const booking = require("./models/bookingModel")
  const Car = require("./models/carModel")
  //webhook
app.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    console.log("here from webHook");
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody || req.body,
        sig,
        //"whsec_1eb4e2dcce015aa727cf72a5152c0a2014d028e3f6557b0f37623192c85d4447"
        "we_1Mf2IsGYrPg1epLH4Z2cUvvJ"
      );
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(`Webhooks error  ${error.message} `);
    }
    
    const eventType = event.type;
    const session = event.data.object;
    //console.log(session);
    switch (eventType) {
      case 'checkout.session.completed':
        if(session.status === 'complete'){
            reqobj.transactionID = session.id
            const newbooking = new booking(reqobj)
            await newbooking.save()
            const car = await Car.findOne({ _id: reqobj.car })
            car.bookedTimeSlots.push(reqobj.bookedTimeSlots)
            await car.save()
            res.send('Your booking is Successful')
        }
        else {
            return res.status(400).json(error);
        }
        
      
/*            stripe.checkout.sessions.listLineItems(
            session.id,
            { limit: 5 },
            function (err, lineItems) {
            // asynchronously called 
            console.log(lineItems); } );  */
          //}
        break;
  
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200);
  });




app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
