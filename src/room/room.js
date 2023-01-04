import { useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Spin, Divider, List, Typography, message, Col, Row, Space } from 'antd';
import { roomsRef } from '../firebase/firebaseConnection';
import { query, where } from "firebase/firestore";
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import CarouselPhoto from './carousel';
import ModalCheckIn from "./modal-check-in";
import ModalCheckOut from "./modal-check-out";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const q = query(roomsRef, where("id", "==", id));
    const [room, loading, error] = useCollectionData(q);
    const { Title, Text, Paragraph, } = Typography;

    useEffect(() => {
        if (!isAuth === true) navigate("/login")
    }, []);

    if (error) { message.error(`Rooms loading error`) }

    if (loading) return <Spin />

    const { gallery, description, features, number, type, occupancy, price, guest, isCheckedIn } = room[0]

    return (
        <Layout className="page-wrapper">
            <p p className="go-back" onClick={() => navigate(-1)}><HomeOutlined /> Back Home</p>
            <Row gutter={[16, 20]} >
                <Col className="gutter-row" span={10}><CarouselPhoto images={gallery} /></Col>
                <Col className="gutter-row" span={4}>
                    <Title underline level={2}> Room {number} </Title>
                    <Paragraph><Text strong> Type: </Text>{type}</Paragraph>
                    <Paragraph><Text strong> Occupancy: </Text>{occupancy}</Paragraph>
                    <Paragraph><Text strong> Price: </Text>{price}$</Paragraph>
                    <Paragraph><Text strong> Guest: </Text>{guest}</Paragraph>
                </Col>
                <Col className="gutter-row" span={10}>
                    <Row justify="end">
                        <Space size="large">
                            <ModalCheckIn number={number} id={id} isCheckedIn={isCheckedIn} />
                            <ModalCheckOut number={number} id={id} isCheckedIn={isCheckedIn} />
                        </Space>
                    </Row>
                    <Row>
                        <Divider orientation="left">Features:</Divider>
                        <List
                            size="small"
                            dataSource={features}
                            renderItem={(item) => (
                                <List.Item>
                                    <Typography.Text ><CheckOutlined /></Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </Row>
                </Col>
                <Col className="gutter-row" span={2}>
                    <Title level={4}> Description: </Title>
                </Col>
                <Col className="gutter-row" span={22}>  <Paragraph>{description} </Paragraph> </Col>
            </Row>
        </Layout>
    );
}
export default Room;
