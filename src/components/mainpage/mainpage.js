import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { Layout, Button } from 'antd';
import { logoutUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import favicon from "./FE-2-design_favicon.png"
import { Checkbox } from 'antd';


const MainPage = () => {
    const { Header, Content } = Layout;
    const { isAuth, userImage } = useAuth()
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logoutUser())
        localStorage.removeItem('userData');
    }
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    if (!isAuth) return <Navigate replace to="/login" />

    return (
        <Layout>
            <Header>
                <img className="favicon" src={favicon} alt="hotel_icon" />
                <div className="imageLogout">
                    <img className="userImage" src={userImage} alt="user_icon" />
                    <p onClick={() => onLogOut()}>Log Out</p>
                </div>
            </Header>
            <Content>
                <Button type="primary">Clear all filters</Button>
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
            </Content>

        </Layout>

    );
}

export default MainPage;


