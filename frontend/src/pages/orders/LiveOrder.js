import React, { useState } from 'react';
import { Table, message, Button } from 'antd';
import { getOrder } from '../../apicalls/orderApiCall';
import moment from 'moment';


function LiveOrder() {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    //const dispatch = useDispatch();

    const columns = [
        {
            title: "Order Id",
            dataIndex: "orderId",
        },
        {
            title: "Dish Name",
            dataIndex: "dishName",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Shipping Address",
            dataIndex: "shippingAddress",
        },
        {
            title: "Total Price",
            dataIndex: "totalPrice",
            render: (text) => "₹ " + text
        },
        {
            title: "Order Time",
            dataIndex: "createdAt",
            render: (text) => {
                const formattedDate = moment(text).format("hh:mm");
                return formattedDate;
            }
        }, 
        {
            title: "Order Status",
            render: (text, record) => (
                <div className='space-x-1'>
                    <Button type="primary" onClick={() => handleAcceptOrder(record.orderId)}>Accept</Button>
                    <Button danger onClick={() => handleCancelOrder(record.orderId)}>Cancel</Button>
                </div>
            ),
        },
    ];

    const getOrders = async () => {
        try {
            const response = await getOrder();
            if (response.success) {
                setOrders(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleAcceptOrder = (orderId) => {

        console.log("Accepted order:", orderId);
    };

    const handleCancelOrder = (orderId) => {

        console.log("Canceled order:", orderId);
    };

    React.useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={orders} />
        </div>
    );
}

export default LiveOrder;
