import { Col, Form, Input, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { editCar } from '../redux/actions/carsActions';
import {useParams} from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsActions';

function EditCar() {
    const { carid } = useParams();
    const {cars} = useSelector(state=>state.carsReducer)
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)
    const [car, setCar] = useState()
    const [totalCars, setTotalCars] = useState([])
    const [radio, setRadio] = useState(0);

    const onChange = (e) => {
        setRadio(e.target.value);
    };

    useEffect(() => {
        
        if(cars.length==0){
            dispatch(getAllCars());
        }
        else{
            setTotalCars(cars)
            setCar(cars.find(o=>o._id===carid))
        }
    }, [cars])

    function onFinish(values){
        values._id = car._id
        dispatch(editCar(values))
        console.log(values);
    }

  return (
    <DefaultLayout>
        {loading === true && (<Spinner/>)}
        <Row className="flex justify-content-center">
            <Col lg={12} sm={24}>
                {totalCars.length>0 && (<Form initialValues={car} className='bxs p-2' layout='vertical' onFinish={onFinish}>
                    <h3>Edit Car</h3>
                    <hr/>
                    <Form.Item name='name' label="Car Name" rules={[{required : true}]}>
                        <Input />
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
                        <button className='btm1'>Edit Car</button>
                    </div>
                </Form>)}
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default EditCar