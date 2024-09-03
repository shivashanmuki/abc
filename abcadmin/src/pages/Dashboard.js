import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 10; i++) {
  data1.push({
    key: i + 1,
    name: `Customer ${i + 1}`,
    product: `Product ${i + 1}`,
    status: i % 2 === 0 ? "Delivered" : "Pending",
  });
}

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 45,
    },
    {
      type: "Feb",
      sales: 58,
    },
    {
      type: "Mar",
      sales: 72,
    },
    {
      type: "Apr",
      sales: 125,
    },
    {
      type: "May",
      sales: 55,
    },
    {
      type: "Jun",
      sales: 65,
    },
    {
      type: "Jul",
      sales: 75,
    },
    {
      type: "Aug",
      sales: 85,
    },
    {
      type: "Sep",
      sales: 95,
    },
    {
      type: "Oct",
      sales: 100,
    },
    {
      type: "Nov",
      sales: 110,
    },
    {
      type: "Dec",
      sales: 120,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#4caf50";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income ($)",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Admin Dashboard - 2024</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">Rs. 50,000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 15%
            </h6>
            <p className="mb-0 desc">Compared To 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Orders</p>
            <h4 className="mb-0 sub-title">1,200</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 10%
            </h6>
            <p className="mb-0 desc">Compared To 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Revenue</p>
            <h4 className="mb-0 sub-title">Rs. 150,000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 5%
            </h6>
            <p className="mb-0 desc">Compared To 2023</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
