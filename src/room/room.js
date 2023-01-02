
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Spin, Divider, List, Typography, Button, message } from 'antd';
import { roomsRef } from '../firebase/firebaseConnection';
import { query, where } from "firebase/firestore";
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import Header from '../components/header/header';
import CarouselPhoto from './carousel';
import { useCollectionData } from "react-firebase-hooks/firestore";


const Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const q = query(roomsRef, where("id", "==", id));
    const [room, loading, error] = useCollectionData(q);

    if (error) { message.error(`Rooms loading error`) }
    console.log(room)
    if (loading) return <Spin />

    const { gallery, description, features } = room[0]
    return (
        <Layout>
            <Header />
            <p onClick={() => navigate("/")}><HomeOutlined /> Back Home</p>
            <CarouselPhoto images={gallery} />
            <div><h4> Description: </h4></div>
            <div><h4> {description}</h4></div>
            <div><h4> Features: </h4></div>

            <Button>Check in</Button>
            <Button type="primary">Check Out</Button>

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
        </Layout>
    );
}
export default Room;
