import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../store/useAuth";
import { Layout } from 'antd';
import Header from "../header/header"
import MainTable from "../mainTable/main-table";


const MainPage = () => {
    const { Content } = Layout;
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate("/login")

    }, []);

    return (
        <Layout>
            <Header />
            <Content>
          <MainTable/>
            </Content>
        </Layout>

    );
}

export default MainPage;


