import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { deleteCar, getAllCars } from '../redux/actions/carsActions';
import { Col, Row, DatePicker, Form, Input, message, Popconfirm, Select, Modal, Switch } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getAllBookings } from '../redux/actions/bookingActions';
import { getAllUsers, editUser, addUser, deleteUser } from '../redux/actions/userActions';

function Admin() {
    const { cars } = useSelector(state => state.carsReducer)
    const { bookings } = useSelector(state => state.bookingsReducer);
    const { loading } = useSelector(state => state.alertsReducer)
    const { users } = useSelector(state => state.usersReducer);
    const [totalCars, settotalCars] = useState([])
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const options = [
        { value: 'system_admin', label: 'System Admin' },
        { value: 'user', label: 'User' },
        { value: 'driver', label: 'Driver' }
    ]

    function getLabel(p, o) {
        for (var i = 0; i < o.length; i++) {
            if (p == o[i].value) {
                //console.log(o[i].label);
                return (o[i].label)
            }
        }
    }

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {

        settotalCars(cars)

    }, [cars])

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    function onFinish(values) {
        values._id = user._id
        values.password = user.password
        dispatch(editUser(values))
        console.log(values);
    }
    function onAdd(values) {
        values.password = "12345"
        dispatch(addUser(values))
        console.log(values);
        setIsModalOpen(false);
    }


    return (
        <DefaultLayout>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-sm-12 d-flex justify-content-start'>
                        <h3>Admin</h3>
                    </div>
                </div>


                {loading === true && (<Spinner />)}

                <div className='row'>
                    <div className='col-md-12'>
                        <ul className='nav nav-tabs' role="tablist">
                            <li className='nav-item'>
                                <a className='nav-link active' data-bs-toggle="tab" data-bs-target="#nav-car"
                                    type="button" role="tab" aria-controls="nav-car" aria-selected="true">Cars</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle="tab" data-bs-target="#nav-book"
                                    type="button" role="tab" aria-controls="nav-book" aria-selected="false">Bookings</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle="tab" data-bs-target="#nav-user"
                                    type="button" role="tab" aria-controls="nav-user" aria-selected="false">Users</a>
                            </li>
                        </ul>
                        <div className='tab-content'>
                            <div className='tab-pane fade show active' role="tabpanel"
                                aria-labelledby="nav-car-tab" id='nav-car'>
                                <div className='d-flex justify-content-end mt-2 pe-4'>
                                    <a href='/addcar' className='logbutton'>Add New Car</a>
                                </div>
                                <Row justify="center" gutter={16} >
                                    {totalCars.map((car) => {
                                        return <Col lg={5} sm={24} xs={24}>
                                            <div className='car p-2 bxs' tabIndex="0">
                                                <img className='carimg img-fluid' src={car.image} />
                                                <div className='car-content d-flex align-items-center justify-content-between'>
                                                    <div>
                                                        <div><p>{car.name}</p></div>
                                                        <div><p>${car.rentPerHour} / Day</p></div>
                                                    </div>
                                                    <div className="me-4">
                                                        <Link to={`/editcar/${car._id}`}><EditOutlined className='me-3' style={{ color: "black" }}/></Link>
                                                        <Popconfirm
                                                            title="Are you sure to delete this car?"
                                                            onConfirm={() => {
                                                                dispatch(deleteCar({ carid: car._id }))
                                                            }}
                                                            okText="Yes"
                                                            cancelText="No" >
                                                            <DeleteOutlined/>
                                                        </Popconfirm>

                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    })}
                                </Row>
                            </div>
                            <div className='tab-pane fade' role="tabpanel"
                                aria-labelledby="nav-book-tab" id='nav-book'>
                                {bookings.map((booking) => {
                                    return <Row className="bxs m-3 text-right flex align-items-center">
                                        <Col lg={6} sm={24}>
                                            <p><b>{booking.car.name + ' - '}</b></p>
                                            <p>Total Days : <b>{booking.totalDays}</b></p>
                                            <p>Total Miles : <b>{booking.miles}</b></p>
                                            <p>Rate : <b>${Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(booking.car.rentPerHour)}</b>/ Day</p>
                                            <p>Total : <b>{Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(booking.total)}</b></p>
                                        </Col>
                                        <Col lg={12} sm={24}>
                                            <p>Transaction ID : <b>{booking.transactionID}</b></p>
                                            <p>From : <b>{moment(booking.bookedTimeSlots.from, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                            <p>To : <b>{moment(booking.bookedTimeSlots.to, "MM-DD-YYYY HH:mm:ss A").format('dddd, MMM Do yyyy, h:mm a')}</b></p>
                                            <p>Trip Booking Date : <b>{moment(booking.createdAt).format('MMM Do yyyy')}</b></p>
                                        </Col>
                                        <Col lg={6} sm={24}>
                                            <img src={booking.car.image} height='150' className='p-2' />
                                        </Col>
                                    </Row>
                                })}
                            </div>
                            <div className="tab-pane fade" role="tabpanel" aria-labelledby="nav-user-tab" id='nav-user'>
                                <div className='d-flex justify-content-end mt-2 pe-4'>
                                    <a onClick={showModal} className='logbutton'>Add New User</a>
                                </div>
                                {users.map((user) => {
                                    return <div className="bxs m-3 p-1 flex justify-content-center">
                                        <Form initialValues={user} layout='vertical' onFinish={onFinish} className="p-4">
                                            <Form.Item name='name' label="User Name" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name='email' label="User Email" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name='phone' label="User Phone Number">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name='role' label="User Role">
                                                <Select className='d-flex justify-content-start' options={options} style={{ width: 150, }} />
                                            </Form.Item>
                                            <div className='d-flex justify-content-end'>
                                                <button className='btm1 me-2'>Edit User</button>
                                                <Popconfirm
                                                    title="Are you sure to delete this user?"
                                                    onConfirm={() => {
                                                        dispatch(deleteUser({ userid: user._id }))
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No" >
                                                    <button className='btm2'>Delete User</button>
                                                </Popconfirm>
                                            </div>
                                        </Form>
                                    </div>
                                })}
                                <Modal title="Add New User" open={isModalOpen} footer={null} onCancel={handleCancel}>
                                    <Form layout='vertical' className="p-4" onFinish={onAdd}>
                                        <Form.Item name='name' label="User Name" rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name='email' label="User Email" rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name='phone' label="User Phone Number">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name='role' label="User Role">
                                            <Select className='d-flex justify-content-start' options={options} style={{ width: 150, }} />
                                        </Form.Item>
                                        <div className='d-flex justify-content-end'>
                                            <button className='btm1'>Add User</button>
                                        </div>
                                    </Form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Admin