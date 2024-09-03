import React, { useEffect } from "react";
import { Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../features/cutomers/customerSlice"; 

const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Email ID",
    dataIndex: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customer.customers);
  const data1 = [];

  const handleDelete = (id) => {
    dispatch(deleteUser(id)) 
      .then(() => {
        message.success("User deleted successfully");
        dispatch(getUsers()); 
      })
      .catch(() => {
        message.error("Error deleting user");
      });
  };

  for (let i = 0; i < customerState.length; i++) {
    data1.push({
      key: i + 1,
      email: customerState[i].email,
      password: customerState[i].password,
      address: customerState[i].address,
      phone: customerState[i].phone,
      role: "Customer",
      action: (
        <Button
          type="danger"
          onClick={() => handleDelete(customerState[i].id)} 
        >
          Delete
        </Button>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Users</h3>
      <div>
        <Table columns={columns} dataSource={data1} rowKey="key" />
      </div>
    </div>
  );
};

export default Users;
