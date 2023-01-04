import favicon from "./FE-2-design_favicon.png"
import { Layout } from 'antd';
import { useAuth } from "../../store/useAuth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { Outlet, useNavigate } from "react-router-dom";

const Header = () => {
    const { Header } = Layout;
    const { userImage } = useAuth()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onLogOut = () => {
        dispatch(logoutUser())
        localStorage.removeItem('userData');
        navigate("/login")
    }
    return (
        <Layout>
            <Header>
                <img className="favicon" src={favicon} alt="hotel_icon" />
                <div className="imageLogout">
                    <img className="userImage" src={userImage} alt="user_icon" />
                    <p onClick={() => onLogOut()}>Log Out</p>
                </div>
            </Header>
            <Outlet />
        </Layout>
    );
}

export default Header;
