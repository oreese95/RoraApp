const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    car : {type: mongoose.Schema.Types.ObjectId , ref:'cars'},
    user : {type: mongoose.Schema.Types.ObjectId , ref:'users'},
    bookedTimeSlots :
        {
            from : {type : String,},
            to : {type : String,},
        }, 
    totalDays : {type: Number},
    mileage : {type: Number},
    subTotal : {type: Number},
    total : {type: Number},
    transactionID : {type: String},
    deliveryRequired : {type: Boolean },
    location : {type: String },
    extras : 
    {
        fuel : {type: Boolean },
        charge : {type: Boolean },
        toll : {type: Boolean },
        clean : {type: Boolean },

    }
}, {timestamps : true}

)

const bookingModel = mongoose.model('bookings', bookingSchema)
module.exports = bookingModel