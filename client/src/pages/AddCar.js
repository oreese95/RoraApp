import { Button, Col, Form, Input, Radio, Row, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import FormList from 'antd/lib/form/FormList';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';
import { MinusCircleOutlined } from '@ant-design/icons';

function AddCar() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)

    const [radio, setRadio] = useState(0);
    const onChange = (e) => {
        setRadio(e.target.value);
    };

    function onFinish(values) {
        values.bookedTimeSlots = []
        dispatch(addCar(values))
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading === true && (<Spinner />)}
            <Row className="flex justify-content-center">
                <Col lg={12} sm={24} style={{ width: "95%" }}>
                    <Form className='bxs p-3' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Car</h3>
                        <hr />
                        <Form.Item name='name' label="Car Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerDay' label="Daily Rate" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='miles' label="Daily Mileage" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label="Capacity" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='deposit' label="Car Deposit" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label="Fuel Type" rules={[{ required: true }]}>
                            <Radio.Group id='radioButtons' onChange={onChange} value={radio}>
                                <Space direction="vertical">
                                    <Radio value="Regular/Unleaded">Regular/Unleaded</Radio>
                                    <Radio value="Premium">Premium</Radio>
                                    <Radio value="Electric">Electric</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <FormList name={"images"}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => {
                                        //console.log(field)
                                        return (
                                            <Form.Item key={field.key} name={[field.name, "url"]} label={`Image ${index + 1}`} rules={[{ required: true }]} >
                                                <Space direction='horizontal'  style={{display: 'flex' }}>
                                                    <Input id="urlIMAGE" placeholder="Image URL"  style={{width: '625px' }}/>
                                                    {fields.length > 1 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            style={{color: "red"}}
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    ) : null}
                                                </Space>
                                            </Form.Item>
                                        );
                                    })}
                                    <FormItem>
                                        <Button type="dashed" block onClick={() => { add(); }}>+ Add Image</Button>
                                    </FormItem>
                                </>
                            )}

                        </FormList>


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