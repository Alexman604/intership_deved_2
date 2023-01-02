import { Button, Layout, Space, Table, Spin, message, Checkbox } from 'antd';
import { useState } from 'react';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { roomsRef } from "../../firebase/firebaseConnection";
import { useNavigate } from 'react-router-dom';


const MainTable = () => {
    const navigate = useNavigate();
    const [rooms, loading, error] = useCollectionData(roomsRef);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    if (error) { message.error(`Rooms loading error`) }

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            sorter: (a, b) => a.number - b.number,
            sortOrder: sortedInfo.columnKey === 'number' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                    text: 'standard',
                    value: 'standard',
                },
                {
                    text: 'suite',
                    value: 'suite',
                },
                {
                    text: 'deluxe',
                    value: 'deluxe',
                },
            ],
            filteredValue: filteredInfo.type || null,
            onFilter: (value, record) => record.type.includes(value),
            ellipsis: true,
        },
        {
            title: 'Occupancy',
            dataIndex: 'occupancy',
            key: 'occupancy',
            filters: [
                {
                    text: '2',
                    value: '2',
                },
                {
                    text: '3',
                    value: '3',
                },
                {
                    text: '4',
                    value: '4',
                },
            ],
            filteredValue: filteredInfo.occupancy || null,
            onFilter: (value, record) => record.occupancy == value,
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => <p>{price}$</p>,

            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Guest',
            dataIndex: 'guest',
            key: 'guest',
            filters: [
                {
                    text: 'filter',
                    value: 'filter',
                },
            ],
            filteredValue: filteredInfo.guest || null,
            onFilter: (value, record) => record.guest.includes(value),
            ellipsis: true,
        },
        {
            dataIndex: 'id',
            key: 'id',
            render: id => <Button type="primary" onClick={() => navigate(`./rooms/${id}`)}>More information </Button>,
        },

    ];
    if (loading) return <Spin />
    return (
        <Layout>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={clearFilters}>Clear filters</Button>
                <Checkbox onChange={onChange}>Free rooms only</Checkbox>
            </Space>
            <Table columns={columns} dataSource={rooms} onChange={handleChange} />
        </Layout>
    );
}

export default MainTable;
