import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBookings } from '../redux/actions/bookingActions';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { Divider } from 'antd';
import moment from 'moment';
import emailjs from '@emailjs/browser';
import globalVar from '../globalVar';

function SuccessBooking() {
    const { sessionid } = useParams();
    const { bookings } = useSelector(state => state.bookingsReducer);
    const { loading } = useSelector(state => state.alertsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])





    return (
        <DefaultLayout>
            <div className='aboutBOX p-2 bxs'>
                <div className='row'>
                    <div className='col-sm-12 p-2 flex justify-content-center'>
                        <h3>Your Trip is Booked</h3>
                        <Divider />
                    </div>
                </div>
                {loading === true && (<Spinner />)}
                {bookings.map((booking) => {
                    if (booking.transactionID === sessionid) {
                        const loggedIN = JSON.parse(localStorage.getItem('user'));
                        const username = loggedIN.name.split(" ")
                        const dinero = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.total)
                        emailjs.send(globalVar.Gmail_SRV, globalVar.Booked_Trip, {
                            to_name: username[0].charAt(0).toUpperCase() + username[0].slice(1),
                            email: loggedIN.email,
                            message: `${booking.car.name}\n${moment(booking.bookedTimeSlots.from).format('dddd, MMM Do yyyy, h:mm a')} - ${moment(booking.bookedTimeSlots.to).format('dddd, MMM Do yyyy, h:mm a')}\n${booking.location}\nTotal Miles - ${booking.mileage}\n${dinero}`,
                        }, globalVar.GMail_Key).then(function (res) {
                            console.log("Email Sent " + res.status)
                        })
                        emailjs.send(globalVar.Gmail_SRV, globalVar.Booked_Trip_Admin, {
                            message: `${loggedIN.name}\n${booking.car.name}\n${moment(booking.bookedTimeSlots.from).format('dddd, MMM Do yyyy, h:mm a')} - ${moment(booking.bookedTimeSlots.to).format('dddd, MMM Do yyyy, h:mm a')} - ${booking.totalDays}\n${booking.location}\nCharge - ${booking.extras.charge}\nFuel - ${booking.extras.fuel}\nToll - ${booking.extras.toll}\nCleaning - ${booking.extras.clean}\n${dinero}`,
                        }, globalVar.GMail_Key).then(function (res) {
                            console.log("Email Sent " + res.status)
                        })
                        return (
                            <div className='row'>
                                <div className='col-md-6'>
                                    <p className=' d-flex justify-content-center'>{booking.car.name}</p>
                                    <img src={booking.car.images[0].url} width="50%" />
                                </div>
                                <div className='col-md-6'>
                                    <p><b>Trip Start</b>: {moment(booking.bookedTimeSlots.from, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</p>
                                    <p><b>Trip End</b>: {moment(booking.bookedTimeSlots.to, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</p>
                                    {booking.deliveryRequired ? <p><b>Delivery Location</b>: {booking.location} - $40.00</p> : <p><b>Rental Location</b>: {booking.location}</p>}
                                    {booking.extras.fuel ? <p><b>Prepaid Fuel</b>: $40.00</p> : ""}
                                    {booking.extras.charge ? <p><b>Prepaid Charging</b>: $25.00</p> : ""}
                                    {booking.extras.clean ? <p><b>Post-Trip Cleaning</b>: $20.00</p> : ""}
                                    {booking.extras.toll ? <p><b>Unlimited Toll Access</b>: $15.00</p> : ""}
                                    <p><b>Max Trip Mileage</b>: {booking.mileage}</p>
                                    <p><b>Deposit Amount</b> (Refunded After Trip - Subject to Incidental Charges): ${booking.car.deposit.toFixed(2)}</p>
                                    <p><b>Total</b>: ${booking.total.toFixed(2)}</p>
                                </div>
                            </div>
                        )
                    }
                })};
            </div>
        </DefaultLayout>

    )
}

export default SuccessBooking