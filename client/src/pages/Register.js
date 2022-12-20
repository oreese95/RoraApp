import React from 'react';
import {Row, Col, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';

function Register() {

    const dispatch = useDispatch()

    function onFinish(values){
        dispatch(userRegister(values))
        console.log(values)
    }
    return (
        <div className='login'>
            <Row gutter={16}>
                <h1>RORA</h1>
                <Col lg={16}></Col>
                <Col lg={8} className="text-left" >
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr/>
                        <Form.Item name='username' label='Username' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Confirm Password' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>

                        <button className='btm1 mt-2 mb-3'>Register</button>
                        <br/>
                        <Link to='/Login'>Click Here to Login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register