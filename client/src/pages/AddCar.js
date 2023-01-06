import { Col, Form, Input, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

function AddCar() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)

    const [radio, setRadio] = useState(0);
    const onChange = (e) => {
        setRadio(e.target.value);
    };

    function onFinish(values){
        values.bookedTimeSlots = []
        dispatch(addCar(values))
        console.log(values);
    }

  return (
    <DefaultLayout>
        {loading === true && (<Spinner/>)}
        <Row className="flex justify-content-center">
            <Col lg={12} sm={24}>
                <Form className='bxs p-2' layout='vertical' onFinish={onFinish}>
                    <h3>Add New Car</h3>
                    <hr/>
                    <Form.Item name='name' label="Car Name" rules={[{required : true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='image' label="Image Url" rules={[{required : true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='rentPerHour' label="Daily Rate" rules={[{required : true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='miles' label="Daily Mileage" rules={[{required : true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='capacity' label="Capacity" rules={[{required : true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='fuelType' label="Fuel Type" rules={[{required : true}]}>
                        <Radio.Group onChange={onChange} value={radio}>
                            <Radio value="Regular/Unleaded">Regular/Unleaded</Radio>
                            <Radio value="Premium">Premium</Radio>
                            <Radio value="Electric">Electric</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div className='d-flex justify-content-end'>
                        <button className='btm1'>Add Car</button>
                    </div>
                </Form>
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default AddCar