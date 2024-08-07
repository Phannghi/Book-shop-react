import React, { useState } from 'react';
import { Button, Form, Input, Typography, Card, Col, Row, notification } from 'antd';
import { Await, Link } from 'react-router-dom';
import '../register/register.scss';
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService';
import { message } from "antd";

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { email, password } = values;
        setIsSubmit(true);
        let res = await postLogin(email, password);
        //console.log('check res: ', res);
        setIsSubmit(false);
        if (res?.data?.access_token) {
            message.success('Đăng nhập thành công');
            navigate('/');
        }
        else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message,
                duration: 3,
            })
        }
    }


    return (
        <div className='register-container'>
            <Row justify='center' align='middle'>
                <Col span={6}>
                    <Card
                        bordered={false}
                        style={{
                            margin: '0 auto'
                        }}
                    >
                        <div className="title">Đăng nhập</div>
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
                                wrapperCol={{
                                    span: 24,
                                }}
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit} block>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <div className="divide">
                                <span>Or</span>
                            </div>
                            <span style={{ marginTop: 20, display: 'inline-block', fontSize: 15 }}>
                                Bạn chưa có tài khoản?
                                <Link to='/register' style={{ marginLeft: 10 }}>Đăng ký</Link>
                            </span>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default LoginPage;