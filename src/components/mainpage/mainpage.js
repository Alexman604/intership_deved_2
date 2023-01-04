import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../store/useAuth";
import { Layout } from 'antd';
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
            <Content>
                <MainTable />
            </Content>
        </Layout>
    );
}

export default MainPage;


