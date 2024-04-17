import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { getCompletedOrders } from '../../apicalls/completedOrdersApiCall';
import moment from 'moment';

function CompletedOrders() {
  const [completedOrders, setCompletedOrders] = useState([]);

  const columns = [
    {
      title: "Dish Name",
      dataIndex: "name",
    },
    
    {
      title: "Transaction Id",
      dataIndex: "merchantTransactionId",
    },
    {
      title: "Merchant Id",
      dataIndex: "merchantId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => "₹ " + text
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Order Time",
      dataIndex: "createdAt",
      render: (text) => {
        const formattedDate = moment(text).format("hh:mm");
        return formattedDate;
      }
    },
  ];

  const getCompletedOrdersData = async () => {
    try {
      const response = await getCompletedOrders();
      if (response.success) {
        const reversedOrders = response.data.reverse();
        setCompletedOrders(reversedOrders);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCompletedOrdersData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={completedOrders} />
    </div>
  );
}

export default CompletedOrders;
