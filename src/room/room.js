
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Spin, Divider, List, Typography, Button, message, Col, Row, Space } from 'antd';
import { roomsRef } from '../firebase/firebaseConnection';
import { query, where } from "firebase/firestore";
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import Header from '../components/header/header';
import CarouselPhoto from './carousel';
import ModalCheckIn from "./modal-check-in";
import ModalCheckOut from "./modal-check-out";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDocToDBroom } from "../import_json/import_json";


const Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const q = query(roomsRef, where("id", "==", id));
    const [room, loading, error] = useCollectionData(q);
    const { Title, Text, Paragraph, } = Typography;

    if (error) { message.error(`Rooms loading error`) }

    if (loading) return <Spin />
    console.log(room[0])
    const { gallery, description, features, number, type, occupancy, price, guest } = room[0]
    return (
        <Layout className="room-page">

            <p onClick={() => navigate(-1)}><HomeOutlined /> Back Home</p>

            <Row gutter={[16, 32]} >
                <Col className="gutter-row" span={11}><CarouselPhoto images={gallery} /></Col>
                <Col className="gutter-row" span={5}>
                <Title underline level={2}> Room {number} </Title>

                <Paragraph><Text strong> Type: </Text>{type}</Paragraph>
                <Paragraph><Text strong> Occupancy: </Text>{occupancy}</Paragraph>
                <Paragraph><Text strong> Price: </Text>{price}$</Paragraph>
                <Paragraph><Text strong> Guest: </Text>{guest}</Paragraph>
                
                </Col>
                <Col className="gutter-row" span={8}>
                    <Row justify="end"> 
                    
                    <Space size ="large">
                        <ModalCheckIn number={number} id={id}/>
                        <ModalCheckOut number={number} id={id} />
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
                <Col className="gutter-row" span={22}>     <div><h4> {description}</h4></div> </Col>
                </Row>                      


                                    

        </Layout>
    );
}
export default Room;
