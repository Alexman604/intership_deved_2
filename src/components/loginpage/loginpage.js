import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { accountsRef } from '../../firebase/firebaseConnection';
import { onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loginUser } from '../../store/userSlice';
import { useAuth } from '../../store/useAuth';
import { Navigate } from "react-router-dom";
import { message } from 'antd';

const LoginPage = () => {
  const [users, setUsers] = useState("");
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const { isAuth } = useAuth()

  useEffect(() => {
    const unSub = onSnapshot(accountsRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unSub;
  }, []);

  const checkUserLogin = (userName, userPassword, remember) => {
    let success = false;
    for (let user of users) {
      if (user.user === userName && user.password === userPassword) {
        message.success(`Welcome ${user.user}!`)
        success = true;

        dispatch(loginUser({ userName: user.user, userImage: user.image, userId: user.id }))
        if (remember) {
          const userData = {
            userName: user.user,
            userImage: user.image,
            userId: user.id
          }
          localStorage.setItem('userData', JSON.stringify(userData))
        }
      }
    } if (!success) { message.error(`Invalid username or password! try "user1" , "pass1"`) }
  }

  const onFinish = (values) => {
    checkUserLogin(values.username, values.password, values.remember);
    form.resetFields();
  };

  return (
    <>
      {isAuth ? <Navigate replace to="/" /> : null}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default LoginPage;