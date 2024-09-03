import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import axios from "axios";

const BASE_URL = "http://localhost:8088/"; 

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const StaffList = () => {
  const [staffState, setStaffState] = useState([]);
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState("");


  const fetchAllStaff = async () => {
    try {
      const response = await axios.get(`${BASE_URL}staff`);
      setStaffState(response.data.data);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      await axios.delete(`${BASE_URL}staff/${id}`);
      setOpen(false);
      fetchAllStaff(); 
    } catch (error) {
      console.error("Failed to delete staff:", error);
    }
  };

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const data1 = staffState.map((staff, index) => ({
    key: index + 1,
    name: staff.name,
    email: staff.email,
    phone: staff.phone,
    action: (
      <>
        {/* <Link to={`/admin/staff/${staff.id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link> */}
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => {
            setOpen(true);
            setStaffId(staff.id);
          }}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Staff</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={() => setOpen(false)}
        open={open}
        performAction={() => handleDeleteStaff(staffId)}
        title="Are you sure you want to delete this staff record?"
      />
    </div>
  );
};

export default StaffList;
