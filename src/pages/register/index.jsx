import React, { useState } from 'react';
import { Button, Form, Input, Typography, Card, Col, Row, notification } from 'antd';
import { Await, Link } from 'react-router-dom';
import './register.scss';
import { useNavigate } from 'react-router-dom'
import { postRegisterUser } from '../../services/apiService';
import { message } from "antd";

const Register = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { fullname, email, password, phone } = values;
        setIsSubmit(true);
        let res = await postRegisterUser(fullname, email, password, phone);
        //console.log('check res: ', res);
        setIsSubmit(false);
        if (res?.data?._id) {
            message.success('Đăng ký thành công');
            navigate('/login');
        }
        else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 3,
            });
        }
    }

    return (
        <div className='register-container'>
            <Row justify='center' align='middle'>
                <Col span={8}>
                    <Card
                        bordered={false}
                        style={{
                            margin: '0 auto'
                        }}
                    >
                        <div className="title">Đăng ký tài khoản</div>
                        <div className="divide"></div>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            // style={{
                            //     maxWidth: 800, margin: '0 auto',
                            // }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Họ tên"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your fullname!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    // {
                                    //     type: 'email',
                                    //     message: 'Please enter correct email syntax!'
                                    // }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    span: 24,
                                }}
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit} block>
                                    Đăng Ký
                                </Button>
                            </Form.Item>
                            <div className="divide">
                                <span>Or</span>
                            </div>
                            <span style={{ marginTop: 20, display: 'inline-block', fontSize: 15 }}>
                                Bạn đã có tài khoản?
                                <Link to='/login' style={{ marginLeft: 10 }}>Đăng nhập</Link>
                            </span>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Register;