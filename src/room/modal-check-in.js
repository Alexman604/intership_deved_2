import { useState } from 'react';
import {
  Button, Modal, Form, DatePicker,
  Input,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { updRoomStatus } from '../firebase/firebaseConnection';

import dayjs from 'dayjs';


const ModalCheckIn = ({ number, id }) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateFormat = 'YYYY-MM-DD';
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, 'day').format(dateFormat))
 
console.log(checkOutDate)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.handleSubmit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values.date.$D);

    updRoomStatus(id, {isCheckedIn: true, guest: values.guest, checkInDate: dayjs().format(dateFormat), checkOutDate: checkOutDate})        
    setIsModalOpen(false);
    form.resetFields();
  };
  const onChange = (date, dateString) => {
    setCheckOutDate(dateString);
   
  };
  return (
    <>
      <Button onClick={showModal}>
        Check In
      </Button>
      <Modal title="Check In" open={isModalOpen} onOk={form.submit} onCancel={handleCancel} okText="Check In">

        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >

          <Form.Item
            label="Please, enter the guest`s name:"
            name="guest"
            rules={[
              {
                required: true,
                message: 'Please, enter the guest`s name!',
              },
            ]}>
            <Input placeholder='Guest`s name' prefix={<UserOutlined />} />
          </Form.Item>


          <Form.Item label="Please, enter the approximate date of guest checkout:"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please, set checkout date',
              },
            ]}>
            <DatePicker   onChange={onChange} format={dateFormat}/>
          </Form.Item>


        </Form>






      </Modal>
    </>
  );

}

export default ModalCheckIn;
