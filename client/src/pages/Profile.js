import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions';
import { Col, Form, Input, Radio, Row } from 'antd';
import moment from 'moment';
import Spinner from '../components/Spinner';
import { editUser } from '../redux/actions/userActions';


function UserBookings() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);
    const { bookings } = useSelector(state => state.bookingsReducer);
    const user = JSON.parse(localStorage.getItem("user"));
    const count = 0
    //console.log(user)

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
                                <a className='nav-link active' data-bs-toggle="tab" data-bs-target="#nav-bookings"
                                    type="button" role="tab" aria-controls="nav-bookings" aria-selected="true">My Bookings</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle="tab" data-bs-target="#nav-info"
                                    type="button" role="tab" aria-controls="nav-info" aria-selected="false">My Info</a>
                            </li>
                        </ul>
                        <div className='tab-content'>
                            <div className='tab-pane fade show active' role="tabpanel"
                                aria-labelledby="nav-bookings-tab" id='nav-bookings'>
                                {bookings.filter(o => o.user === user._id).map((booking) => {
                                     return <Row className="bxs m-3 text-right flex align-items-center">
                                        <Col lg={6} sm={24}>
                                            <p><b>{booking.car.name}</b></p>
                                            <p>Total Days : <b>{booking.totalDays}</b></p>
                                            <p>Rate : <b>{booking.car.rentPerHour}</b>/ Day</p>
                                            <p>Total : <b>{booking.total}</b></p>
                                        </Col>
                                        <Col lg={12} sm={24}>
                                            <p>Transaction ID : <b>{booking.transactionID}</b></p>
                                            <p>From : <b>{moment(booking.bookedTimeSlots.from).format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                            <p>To : <b>{moment(booking.bookedTimeSlots.to).format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                            <p>Trip Booking Date : <b>{moment(booking.createdAt).format('MMM Do yyyy')}</b></p>
                                        </Col>
                                        <Col lg={6} sm={24}>
                                            <img src={booking.car.image} height='150' className='p-2' />
                                        </Col>
                                    </Row>
                                })}
                            </div>
                            <div className='tab-pane fade' role="tabpanel"
                                aria-labelledby="nav-info-tab" id='nav-info'>
                                <div className="bxs p-3 container">
                                    <div className="row">
                                        <div className="col-md-12 flex justify-content-start">
                                            <Form initialValues={user} className='p-2' layout='vertical' onFinish={onFinish}>
                                                <Form.Item name="name" label="Name">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="email" label="Email">
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item name="phone" label="Phone Number">
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item name="password" label="Password">
                                                    <Input/>
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