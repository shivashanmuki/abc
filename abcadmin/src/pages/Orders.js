import React, { useEffect } from "react";
import { Table, Button, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { getOrders } from "../features/auth/authSlice";

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/reservations/${id}`);
      message.success("Reservation deleted successfully");
      dispatch(getOrders()); 
    } catch (error) {
      message.error("Error deleting reservation");
    }
  };


  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8088/reservations/${id}`, null, {
        params: { status: true },
      });
      message.success("Reservation accepted successfully");
      dispatch(getOrders()); 
    } catch (error) {
      message.error("Error updating reservation status");
    }
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      width: 120,
    },
    {
      title: "Reservation ID",
      dataIndex: "reservationId",
      width: 150,
    },
    {
      title: "Reservation Type",
      dataIndex: "reservationType",
      width: 150,
    },
    {
      title: "Reservation Date",
      dataIndex: "date",
      width: 150,
    },
    {
      title: "Reservation Time",
      dataIndex: "time",
      width: 150,
    },
    {
      title: "Number of People",
      dataIndex: "guestCount",
      width: 150,
    },
    {
      title: "Special Requests & Food Details",
      dataIndex: "specialRequests",
      width: 300,
      render: (text, record) => {
        const foodDetails = Object.entries(record.product).map(
          ([product, price]) => (
            <Tag key={product} color="geekblue" style={{ marginBottom: "8px" }}>
              <strong>{product}</strong>: ${price}
            </Tag>
          )
        );

        return (
          <div>
            <div style={{ marginBottom: "8px" }}>
              <strong>Food Details:</strong>
              <div style={{ marginTop: "8px" }}>{foodDetails}</div>
            </div>
            <div>
              <strong>Special Requests:</strong>
              <p>{record.specialRequests || "No special requests"}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 200,
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleAccept(record.reservationId)}
            style={{ fontSize: "12px", color: "white", marginRight: "8px" }}
          >
            {record.status ? "Accepted" : "Accept"}
          </Button>
          <Button
            type="danger"
            icon={<AiFillDelete />}
            onClick={() => handleDelete(record.reservationId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

const data1 = Array.isArray(orderState)
  ? orderState.map((order) => ({
      userId: order.user,
      reservationId: order.id,
      reservationType: order.service || "Unknown",
      date: new Date(order.time).toLocaleDateString(),
      time: new Date(order.time).toLocaleTimeString(),
      guestCount: order.numberOfPeople || "Unknown",
      product: order.product,
      specialRequests: order.specialRequests,
      paymentMethod: order.paymentMethod || "Unknown",
      status: order.status, 
      action: "",
    }))
  : [];


  return (
    <div>
      <h3 className="mb-4 title">Reservations</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          rowKey="reservationId"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default Reservations;
