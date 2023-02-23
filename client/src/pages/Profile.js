import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions';
import { Col, Divider, Form, Input, Row } from 'antd';
import moment from 'moment';
import Spinner from '../components/Spinner';
import { editUser } from '../redux/actions/userActions';


function UserBookings() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);
    const { bookings } = useSelector(state => state.bookingsReducer);
    const user = JSON.parse(localStorage.getItem("user"));
    const today = new Date();
    var count = 0;
    var count2 = 0;

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])

    function onFinish(values) {
        values.role = user.role
        values._id = user._id
        dispatch(editUser(values))
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading === true && (<Spinner />)}
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        <ul className='nav nav-tabs' role="tablist">
                            <li className='nav-item'>
                                <a className='nav-link active' data-bs-toggle="tab" data-bs-target="#nav-current"
                                    type="button" role="tab" aria-controls="nav-current" aria-selected="true">Current</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle="tab" data-bs-target="#nav-info"
                                    type="button" role="tab" aria-controls="nav-info" aria-selected="false">My Info</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle="tab" data-bs-target="#nav-bookings"
                                    type="button" role="tab" aria-controls="nav-bookings" aria-selected="true">Past Trips</a>
                            </li>
                        </ul>
                        <div className='tab-content'>
                            <div className='tab-pane fade show active' role="tabpanel"
                                aria-labelledby="nav-current-tab" id='nav-current'>
                                <div className='bxs mt-3'>
                                    <div className='row p-3'>
                                        <div className='col-md-12'>
                                            <h3 className='pt-3'>Current Trips</h3>
                                            <Divider />
                                            {bookings.filter(o => o.user === user._id).map((booking) => {
                                                const from = new Date(booking.bookedTimeSlots.from);
                                                const to = new Date(booking.bookedTimeSlots.to);
                                                if (today > from && today < to){
                                                    count++;
                                                    return <Row className="bxs mt-3 p-3 text-right flex align-items-center">
                                                        <Col lg={6} sm={24}>
                                                            <p><u><b>{booking.car.name}</b></u></p>
                                                            <p>Total Days : <b>{booking.totalDays}</b></p>
                                                            <p>Total Miles : <b>{booking.mileage}</b></p>
                                                            <p>Rate : <b>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.car.rentPerDay)}</b>/ Day</p>
                                                            <p>Total : <b>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.total)}</b></p>
                                                        </Col>
                                                        <Col lg={12} sm={24}>
                                                            <p style={{ overflowY: "scroll" }}>Transaction ID : <b>{booking.transactionID}</b></p>
                                                            <p>From : <b>{moment(booking.bookedTimeSlots.from, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                                            <p>To : <b>{moment(booking.bookedTimeSlots.to, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                                            <p>Trip Booking Date : <b>{moment(booking.createdAt).format('MMM Do yyyy')}</b></p>
                                                        </Col>
                                                        <Col lg={6} sm={24}>
                                                            <img src={booking.car.images[0].url} height='150' className='p-2' />
                                                        </Col>
                                                    </Row>
                                                }
                                            })}
                                            {count === 0 ? <p className='d-flex justify-content-center pb-3'>No Current Trips</p> : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className='bxs mt-3'>
                                    <div className='row p-3'>
                                        <div className='col-md-12'>
                                            <h3 className='pt-2'>Upcoming Trips</h3>
                                            <Divider />
                                            {bookings.filter(o => o.user === user._id).map((booking) => {
                                                const from = new Date(booking.bookedTimeSlots.from);
                                                if (today < from){
                                                    count2++;
                                                    return <Row className="bxs mt-3 p-3 text-right flex align-items-center">
                                                        <Col lg={6} sm={24}>
                                                            <p><u><b>{booking.car.name}</b></u></p>
                                                            <p>Total Days : <b>{booking.totalDays}</b></p>
                                                            <p>Total Miles : <b>{booking.mileage}</b></p>
                                                            <p>Rate : <b>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.car.rentPerDay)}</b>/ Day</p>
                                                            <p>Total : <b>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.total)}</b></p>
                                                        </Col>
                                                        <Col lg={12} sm={24}>
                                                            <p style={{ overflowY: "scroll" }}>Transaction ID : <b>{booking.transactionID}</b></p>
                                                            <p>From : <b>{moment(booking.bookedTimeSlots.from, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                                            <p>To : <b>{moment(booking.bookedTimeSlots.to, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                                            <p>Trip Booking Date : <b>{moment(booking.createdAt).format('MMM Do yyyy')}</b></p>
                                                        </Col>
                                                        <Col lg={6} sm={24}>
                                                            <img src={booking.car.images[0].url} height='150' className='p-2' />
                                                        </Col>
                                                    </Row>
                                                }
                                            })}
                                            {count2 === 0 ? <p className='d-flex justify-content-center pb-3'>No Upcoming Trips</p> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='tab-pane fade' role="tabpanel"
                                aria-labelledby="nav-bookings-tab" id='nav-bookings'>
                                {bookings.filter(o => o.user === user._id).reverse().map((booking) => {
                                    return <Row className="bxs mt-3 p-3 text-right flex align-items-center">
                                        <Col lg={6} sm={24}>
                                            <p><u><b>{booking.car.name}</b></u></p>
                                            <p>Total Days : <b>{booking.totalDays}</b></p>
                                            <p>Total Miles : <b>{booking.mileage}</b></p>
                                            <p>Rate : <b>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.car.rentPerDay)}</b>/ Day</p>
                                            <p>Total : <b>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.total)}</b></p>
                                        </Col>
                                        <Col lg={12} sm={24}>
                                            <p style={{ overflowY: "scroll" }}>Transaction ID : <b>{booking.transactionID}</b></p>
                                            <p>From : <b>{moment(booking.bookedTimeSlots.from, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                            <p>To : <b>{moment(booking.bookedTimeSlots.to, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                            <p>Trip Booking Date : <b>{moment(booking.createdAt).format('MMM Do yyyy')}</b></p>
                                        </Col>
                                        <Col lg={6} sm={24}>
                                            <img src={booking.car.images[0].url} height='150' className='p-2' />
                                        </Col>
                                    </Row>
                                })}
                            </div>
                            <div className='tab-pane fade' role="tabpanel"
                                aria-labelledby="nav-info-tab" id='nav-info'>
                                <div className="bxs p-3 mt-3">
                                    <div className="row">
                                        <div className="col-md-12 flex justify-content-start">
                                            <Form initialValues={user} className='p-2' layout='vertical' onFinish={onFinish}>
                                                <Form.Item name="name" label="Name">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="email" label="Email">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="phone" label="Phone Number">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="password" label="Password">
                                                    <Input />
                                                </Form.Item>
                                                <div className='d-flex justify-content-end'>
                                                    <button className='btm1'>Update Info</button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </DefaultLayout>
    )
}

export default UserBookings