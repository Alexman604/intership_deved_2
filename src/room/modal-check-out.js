import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { updRoomStatus } from '../firebase/firebaseConnection';

const ModalCheckOut = ({number, id, isCheckedIn}) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        

        const showModal = () => {
          setIsModalOpen(true);
        };
        const handleOk = () => {
          setIsModalOpen(false);
          updRoomStatus(id, {isCheckedIn: false, guest: "", checkInDate: ""})
          message.success(`Room ${number} is no longer occupied`)

        };
        const handleCancel = () => {
          setIsModalOpen(false);
        };



   
        return (
          <>
            <Button type="primary" 
             disabled = {+!isCheckedIn}
            onClick={showModal}>
              Check Out
            </Button>
            <Modal title="Check Out" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Confirm">
              <p>Do you confirm the check out Room {number} ?</p>
            </Modal>
          </>
        );
    
}

export default ModalCheckOut;